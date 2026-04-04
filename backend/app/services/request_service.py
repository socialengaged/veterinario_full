from __future__ import annotations

import time
from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from uuid import UUID

from sqlalchemy import and_, select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import (
    create_access_token,
    hash_password,
    hash_token,
    new_raw_verification_token,
    verify_password,
)
from app.models.entities import (
    AdminNotification,
    Animal,
    Conversation,
    EmailVerification,
    Message,
    MessageSenderRole,
    RequestMatch,
    Specialty,
    Specialist,
    User,
    UserAddress,
    VetRequest,
    specialist_specialties,
)
from app.services.admin_match_payload import (
    admin_team_whatsapp_url_with_text,
    enrich_specialist_matches,
)
from app.services.email_service import EmailService
from app.services.request_uploads import load_request_uploads, save_request_uploads
from app.services.whatsapp_text import build_admin_whatsapp_payload

import logging

logger = logging.getLogger(__name__)

ONLINE_CONSULT_DESC_MARKER = "--- Servizio consulenza online ---"


def _tier_label_it(tier: str) -> str:
    return {
        "std_15_30": "15 minuti — 30 € (consulenza semplice: monitoraggio terapia, iter diagnostico)",
        "std_30_50": "30 minuti (massimo) — 50 € (second opinion o consulenza casi cronici)",
        "specialist_100": "Consulenza veterinaria specialistica — 100 €",
    }[tier]


def _online_description_block(tier: str) -> str:
    return (
        f"\n\n{ONLINE_CONSULT_DESC_MARKER}\n"
        f"Modalità: videochiamata Google Meet.\n"
        f"Tariffa scelta: {_tier_label_it(tier)}.\n"
        f"Pagamento: PayPal (email destinatario indicata in configurazione e nella mail di conferma).\n"
    )


def _is_online_consultation_description(description: str | None) -> bool:
    return bool(description and ONLINE_CONSULT_DESC_MARKER in description)


class RequestService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.settings = get_settings()
        self.email = EmailService()

    def _get_or_create_user(
        self,
        email: str,
        full_name: str,
        phone: Optional[str],
        password_plain: Optional[str] = None,
    ) -> User:
        email_norm = email.strip().lower()
        user = self.db.scalar(select(User).where(User.email == email_norm))
        if user:
            user.full_name = full_name
            if phone:
                user.phone = phone
            if user.hashed_password:
                if not password_plain or not verify_password(password_plain, user.hashed_password):
                    raise ValueError(
                        "Questa email è già registrata. Usa la password corretta oppure accedi, "
                        "oppure usa un altro indirizzo email."
                    )
            else:
                if password_plain and len(password_plain) >= 8:
                    user.hashed_password = hash_password(password_plain)
                elif not password_plain:
                    raise ValueError("Password obbligatoria (min. 8 caratteri) per creare o completare l'account.")
            return user
        if not password_plain or len(password_plain) < 8:
            raise ValueError("Password obbligatoria (min. 8 caratteri) per creare l'account.")
        user = User(
            email=email_norm,
            full_name=full_name,
            phone=phone,
            hashed_password=hash_password(password_plain),
        )
        self.db.add(user)
        self.db.flush()
        return user

    def _match_specialists(
        self,
        specialty_id: UUID,
        city: str,
        province: str,
        species: str,
        user_cap: Optional[str] = None,
    ) -> list[tuple[Specialist, float]]:
        spec_rows = self.db.execute(
            select(Specialist)
            .join(
                specialist_specialties,
                Specialist.id == specialist_specialties.c.specialist_id,
            )
            .where(
                and_(
                    specialist_specialties.c.specialty_id == specialty_id,
                    Specialist.is_active.is_(True),
                )
            )
        ).scalars().all()

        scored: list[tuple[Specialist, float]] = []
        city_l = city.strip().lower()
        prov_l = province.strip().lower()
        cap_u = (user_cap or "").strip() or None
        for sp in spec_rows:
            # Skip specialist senza contatti reali
            has_real_email = (
                sp.contact_email
                and sp.contact_email.strip()
                and "@noemail.local" not in sp.contact_email
            )
            has_phone = bool(sp.phone_mobile and sp.phone_mobile.strip())
            if not has_real_email and not has_phone:
                continue
            score = 0.0
            if sp.city.strip().lower() == city_l:
                score += 50.0
            elif sp.province.strip().lower() == prov_l:
                score += 10.0
            tags = sp.species_tags if isinstance(sp.species_tags, list) else []
            if not tags or species in tags:
                score += 40.0
            sp_cap = (sp.cap or "").strip() if sp.cap else ""
            if cap_u and sp_cap and cap_u == sp_cap:
                score += 80.0
            if score > 0:
                scored.append((sp, score))
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:25]

    def _dispatch_request_to_vets(
        self,
        req: VetRequest,
        *,
        phone_fallback: str,
        urgency: str,
    ) -> list[dict[str, Any]]:
        addr = self.db.get(UserAddress, req.address_id)
        animal = self.db.get(Animal, req.animal_id)
        specialty = self.db.get(Specialty, req.specialty_id)
        user = self.db.get(User, req.user_id)
        if not addr or not animal or not specialty or not user:
            raise ValueError("Dati richiesta incompleti per inoltro veterinari")

        city, province = addr.city, addr.province
        user_cap = (addr.cap or "").strip() or None
        matches = self._match_specialists(
            specialty.id, city, province, animal.species, user_cap=user_cap
        )
        for sp, sc in matches:
            self.db.add(RequestMatch(request_id=req.id, specialist_id=sp.id, score=sc))

        profile_notes = (user.profile_notes_for_vets or "").strip() or None
        matched_specs = enrich_specialist_matches(
            matches,
            specialty_name=specialty.name,
            user_name=user.full_name,
            user_email=user.email,
            user_phone=user.phone or phone_fallback,
            animal_species=animal.species,
            city=city,
            province=province,
            user_cap=user_cap,
            description=req.description,
            profile_notes=profile_notes,
        )

        wa_payload = build_admin_whatsapp_payload(
            user_email=user.email,
            user_name=user.full_name,
            user_phone=user.phone or phone_fallback,
            animal_species=animal.species,
            animal_name=animal.name,
            city=city,
            province=province,
            specialty=specialty.name,
            urgency=urgency,
            description=req.description,
            matches=matched_specs,
            profile_notes=profile_notes,
        )

        # Notifica già creata al submit; qui si persistono i match e si invia email di conferma inoltro.
        req.status = "open"

        try:
            team_wa = admin_team_whatsapp_url_with_text(
                self.settings.admin_whatsapp_url, wa_payload["whatsapp_text"]
            )
            att: list[tuple[str, bytes, str]] | None = None
            if _is_online_consultation_description(req.description):
                loaded = load_request_uploads(self.settings.request_upload_dir, req.id)
                att = loaded if loaded else None
            self.email.send_admin_new_request(
                admin_email=self.settings.admin_email,
                user_email=user.email,
                user_name=user.full_name,
                user_phone=user.phone or phone_fallback,
                animal_species=animal.species,
                city=city,
                province=province,
                specialty_name=specialty.name,
                urgency=urgency,
                description=req.description,
                matches=matched_specs,
                whatsapp_text=wa_payload["whatsapp_text"],
                team_whatsapp_url_with_text=team_wa,
                user_cap=user_cap,
                profile_notes=profile_notes,
                is_online_consultation=_is_online_consultation_description(req.description),
                attachments=att,
            )
        except Exception:
            logger.exception("Email admin fallita dopo inoltro richiesta")

        # --- Invio automatico email ai veterinari con email reale ---
        self._send_emails_to_matched_specialists(
            matches=matches,
            req=req,
            user=user,
            animal=animal,
            specialty=specialty,
            city=city,
            province=province,
            urgency=urgency,
            phone_fallback=phone_fallback,
        )

        return matched_specs

    def _send_emails_to_matched_specialists(
        self,
        *,
        matches: list[tuple[Specialist, float]],
        req: VetRequest,
        user: User,
        animal: Animal,
        specialty: Specialty,
        city: str,
        province: str,
        urgency: str,
        phone_fallback: str,
    ) -> None:
        """Invia email ai veterinari matchati che hanno email reale."""
        import hmac as _hmac
        import hashlib

        sent = 0
        max_emails = 25
        for sp, _score in matches:
            if sent >= max_emails:
                break
            email = (sp.contact_email or "").strip()
            if not email or "@noemail.local" in email:
                continue

            # Build opt-out URL con HMAC
            secret = (self.settings.secret_key or "").encode()
            sig = _hmac.new(secret, str(sp.id).encode(), hashlib.sha256).hexdigest()[:16]
            optout_url = (
                f"{self.settings.api_public_url.rstrip("/")}/specialists/optout"
                f"?id={sp.id}&sig={sig}"
            )

            try:
                self.email.send_request_to_specialist(
                    specialist_email=email,
                    specialist_name=sp.full_name or "Dottore",
                    user_name=user.full_name or "",
                    user_phone=user.phone or phone_fallback,
                    animal_species=animal.species,
                    city=city,
                    province=province,
                    specialty_name=specialty.name,
                    urgency=urgency,
                    description=req.description,
                    request_id=str(req.id),
                    optout_url=optout_url,
                )
                # Aggiorna match come contattato
                match_row = self.db.scalar(
                    select(RequestMatch).where(
                        RequestMatch.request_id == req.id,
                        RequestMatch.specialist_id == sp.id,
                    )
                )
                if match_row:
                    match_row.contacted = True
                    match_row.contacted_at = datetime.now(timezone.utc)

                sent += 1
                if sent < max_emails:
                    time.sleep(0.5)  # Rate limiting tra invii
            except Exception:
                logger.exception(
                    "Email a specialista fallita: specialist=%s email=%s",
                    sp.id, email,
                )

        if sent > 0:
            self.db.commit()
            logger.info(
                "Inviate %d email a specialisti per richiesta %s",
                sent, req.id,
            )

    def release_pending_requests_for_user(self, user_id: UUID) -> None:
        """Dopo verifica email: inoltra ai veterinari le richieste ancora in attesa."""
        reqs = self.db.scalars(
            select(VetRequest).where(
                VetRequest.user_id == user_id,
                VetRequest.status == "pending_verification",
            )
        ).all()
        if not reqs:
            return
        user = self.db.get(User, user_id)
        phone_fb = (user.phone or "") if user else ""
        for req in reqs:
            self._dispatch_request_to_vets(req, phone_fallback=phone_fb, urgency=req.urgency)
            conv = self.db.scalar(select(Conversation).where(Conversation.request_id == req.id).limit(1))
            if conv:
                # Messaggio utente con le note del modulo già creato in create_request
                if _is_online_consultation_description(req.description):
                    sys_body = (
                        "Email verificata. Abbiamo inoltrato la tua richiesta di consulenza online: "
                        "ti contatteremo per confermare pagamento (PayPal) e organizzare la videochiamata su Google Meet."
                    )
                else:
                    sys_body = (
                        "Email verificata. Abbiamo inoltrato la tua richiesta alle strutture veterinarie "
                        "della tua zona per trovare la prima disponibilità tra i nostri contatti. "
                        "Ti ricontatteranno secondo le preferenze indicate (email, SMS o WhatsApp)."
                    )
                self.db.add(
                    Message(
                        conversation_id=conv.id,
                        sender_role=MessageSenderRole.system.value,
                        body=sys_body,
                    )
                )
        self.db.commit()

    def create_request(
        self,
        *,
        email: str,
        full_name: str,
        phone: Optional[str],
        animal_species: str,
        animal_name: Optional[str],
        city: str,
        province: str,
        cap: Optional[str],
        specialty_slug: str,
        sub_service: Optional[str],
        urgency: str,
        description: Optional[str],
        contact_method: str,
        marketing_consent: bool,
        password_plain: Optional[str] = None,
        consultation_online: bool = False,
        consultation_tier: Optional[str] = None,
        uploaded_files: Optional[list[tuple[str, bytes, str]]] = None,
    ) -> dict[str, Any]:
        slug = specialty_slug.strip().lower()
        specialty = self.db.scalar(select(Specialty).where(Specialty.slug == slug))
        if not specialty:
            raise ValueError(f"Specialty not found: {specialty_slug}")

        user = self._get_or_create_user(email, full_name, phone, password_plain)
        forward_to_vets = user.email_verified_at is not None

        addr = UserAddress(
            user_id=user.id,
            city=city.strip(),
            province=province.strip().upper()[:8],
            cap=cap,
            label="richiesta",
        )
        self.db.add(addr)
        self.db.flush()

        animal = Animal(
            user_id=user.id,
            species=animal_species.strip().lower(),
            name=animal_name,
            notes=None,
        )
        self.db.add(animal)
        self.db.flush()

        merged_description = (description or "").strip()
        tier_label_for_email = ""
        if consultation_online and consultation_tier:
            block = _online_description_block(consultation_tier)
            tier_label_for_email = _tier_label_it(consultation_tier)
            merged_description = (merged_description + block).strip() if merged_description else block.strip()

        req = VetRequest(
            user_id=user.id,
            animal_id=animal.id,
            address_id=addr.id,
            specialty_id=specialty.id,
            urgency=urgency or "normale",
            description=merged_description or None,
            contact_method=contact_method,
            marketing_consent=marketing_consent,
            sub_service=sub_service,
            status="open" if forward_to_vets else "pending_verification",
        )
        self.db.add(req)
        self.db.flush()

        user_cap = (addr.cap or "").strip() or None
        pn = (user.profile_notes_for_vets or "").strip() or None
        matches = self._match_specialists(
            specialty.id, city, province, animal.species, user_cap=user_cap
        )
        matched_specs = enrich_specialist_matches(
            matches,
            specialty_name=specialty.name,
            user_name=user.full_name,
            user_email=user.email,
            user_phone=user.phone or (phone or ""),
            animal_species=animal.species,
            city=city,
            province=province,
            user_cap=user_cap,
            description=merged_description or None,
            profile_notes=pn,
        )
        wa_payload = build_admin_whatsapp_payload(
            user_email=user.email,
            user_name=user.full_name,
            user_phone=user.phone or (phone or ""),
            animal_species=animal.species,
            animal_name=animal.name,
            city=city,
            province=province,
            specialty=specialty.name,
            urgency=urgency,
            description=merged_description or None,
            matches=matched_specs,
            profile_notes=pn,
        )
        if forward_to_vets:
            for sp, sc in matches:
                self.db.add(RequestMatch(request_id=req.id, specialist_id=sp.id, score=sc))

        conv = Conversation(request_id=req.id, user_id=user.id)
        self.db.add(conv)
        self.db.flush()

        # --- Messaggio strutturato richiesta utente ---
        user_msg_parts = [f"Richiesta veterinario"]
        user_msg_parts.append(f"Animale: {animal.species}{(' ' + animal.name) if animal.name else ''}")
        user_msg_parts.append(f"Servizio: {specialty.name}")
        user_msg_parts.append(f"Zona: {city} ({province})")
        user_msg_parts.append(f"Urgenza: {urgency or 'normale'}")
        desc_stripped = (merged_description or "").strip()
        if desc_stripped:
            user_msg_parts.append(desc_stripped)
        self.db.add(
            Message(
                conversation_id=conv.id,
                sender_role=MessageSenderRole.user.value,
                body="\n".join(user_msg_parts),
            )
        )

        # --- Risposta assistente VeterinarioVicino ---
        user_first = (user.full_name or "").split()[0] if user.full_name else ""
        if forward_to_vets:
            if consultation_online:
                welcome = (
                    f"Grazie{(' ' + user_first) if user_first else ''}! "
                    f"La tua richiesta di consulenza online per {animal.species} "
                    f"è stata inoltrata ai nostri specialisti.\n\n"
                    "Ti contatteranno per organizzare la videochiamata su Google Meet "
                    "e il pagamento.\n\n"
                    "Controlla la mail per la conferma e verifica anche la cartella spam."
                )
            else:
                welcome = (
                    f"Grazie{(' ' + user_first) if user_first else ''}! "
                    f"La tua richiesta è stata inoltrata ai migliori veterinari "
                    f"nella tua zona per {animal.species} e {specialty.name}.\n\n"
                    "Troverai qui la risposta e verrai notificato via email.\n\n"
                    "Controlla la mail per verificare di aver ricevuto copia della tua richiesta, "
                    "e controlla la cartella spam. Rimuovi da spam per ricevere le notifiche "
                    "sulla richiesta."
                )
        else:
            if consultation_online:
                welcome = (
                    f"Ciao{(' ' + user_first) if user_first else ''}! "
                    "Abbiamo registrato la tua consulenza online. Per ricevere istruzioni e coordinare "
                    "pagamento e videochiamata, apri l'email che ti abbiamo inviato e "
                    "clicca sul link di verifica.\n\n"
                    "Controlla anche la cartella spam."
                )
            else:
                welcome = (
                    f"Ciao{(' ' + user_first) if user_first else ''}! "
                    "Abbiamo registrato la tua richiesta. Per inoltrarla ai veterinari della tua zona e "
                    "cercare la prima disponibilità tra i nostri contatti, apri l'email che ti abbiamo inviato e "
                    "clicca sul link di verifica.\n\n"
                    "Controlla anche la cartella spam. Rimuovi da spam per ricevere le notifiche "
                    "sulla richiesta."
                )
        self.db.add(
            Message(
                conversation_id=conv.id,
                sender_role=MessageSenderRole.system.value,
                body=welcome,
            )
        )

        raw_token = new_raw_verification_token()
        ev = EmailVerification(
            user_id=user.id,
            token_hash=hash_token(raw_token),
            expires_at=datetime.now(timezone.utc) + timedelta(days=7),
        )
        self.db.add(ev)
        self.db.flush()

        access_token = create_access_token(str(user.id))

        redirect_url = f"{self.settings.frontend_url.rstrip('/')}/verify-email?token={raw_token}"

        # Stesso payload WhatsApp (match + testo) per admin anche se l'utente non ha ancora verificato l'email:
        # così dashboard/notifiche e flusso operativo coincidono con l'email admin inviata subito dopo il commit.
        notif_title = (
            f"Nuova richiesta {req.id}"
            if forward_to_vets
            else f"Nuova richiesta {req.id} (attesa verifica email)"
        )
        self.db.add(
            AdminNotification(
                channel="whatsapp",
                title=notif_title,
                payload_json=wa_payload,
            )
        )

        self.db.commit()

        if uploaded_files and consultation_online:
            try:
                save_request_uploads(self.settings.request_upload_dir, req.id, uploaded_files)
            except Exception:
                logger.exception("Salvataggio allegati consulenza online fallito (richiesta già registrata)")

        try:
            self.email.send_user_request_confirmation(
                to_email=user.email,
                user_name=user.full_name,
                request_id=str(req.id),
                verify_url=redirect_url,
                is_online_consultation=consultation_online,
                paypal_email=self.settings.online_consult_paypal_email,
                online_tier_label=tier_label_for_email,
            )
        except Exception:
            logger.exception("Email conferma utente fallita dopo persistenza richiesta")

        try:
            uc = (cap or "").strip() or None
            team_wa = admin_team_whatsapp_url_with_text(
                self.settings.admin_whatsapp_url, wa_payload["whatsapp_text"]
            )
            att_admin: list[tuple[str, bytes, str]] | None = None
            if consultation_online and uploaded_files:
                att_admin = uploaded_files
            self.email.send_admin_new_request(
                admin_email=self.settings.admin_email,
                user_email=user.email,
                user_name=user.full_name,
                user_phone=phone or "",
                animal_species=animal.species,
                city=city,
                province=province,
                specialty_name=specialty.name,
                urgency=urgency,
                description=merged_description or None,
                matches=matched_specs,
                whatsapp_text=wa_payload["whatsapp_text"],
                team_whatsapp_url_with_text=team_wa,
                user_cap=uc,
                profile_notes=pn,
                is_online_consultation=consultation_online,
                attachments=att_admin,
                pending_email_verification=not forward_to_vets,
            )
        except Exception:
            logger.exception("Email admin fallita dopo persistenza richiesta")

        email_verified = user.email_verified_at is not None

        return {
            "success": True,
            "user_id": str(user.id),
            "request_id": str(req.id),
            "conversation_id": str(conv.id),
            "email_verified": email_verified,
            "redirect_url": redirect_url,
            "access_token": access_token,
            "token_type": "bearer",
        }
