from __future__ import annotations

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
from app.services.whatsapp_text import build_admin_whatsapp_payload

import logging
logger = logging.getLogger(__name__)


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

        notif = AdminNotification(
            channel="whatsapp",
            title=f"Nuova richiesta {req.id}",
            payload_json=wa_payload,
        )
        self.db.add(notif)
        req.status = "open"

        try:
            team_wa = admin_team_whatsapp_url_with_text(
                self.settings.admin_whatsapp_url, wa_payload["whatsapp_text"]
            )
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
            )
        except Exception:
            logger.exception("Email admin fallita dopo inoltro richiesta")

        return matched_specs

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
                desc = (req.description or "").strip()
                if desc:
                    self.db.add(
                        Message(
                            conversation_id=conv.id,
                            sender_role=MessageSenderRole.user.value,
                            body=desc,
                        )
                    )
                self.db.add(
                    Message(
                        conversation_id=conv.id,
                        sender_role=MessageSenderRole.system.value,
                        body=(
                            "Email verificata. Abbiamo inoltrato la tua richiesta alle strutture veterinarie "
                            "della tua zona per trovare la prima disponibilità tra i nostri contatti. "
                            "Ti ricontatteranno secondo le preferenze indicate (email, SMS o WhatsApp)."
                        ),
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

        req = VetRequest(
            user_id=user.id,
            animal_id=animal.id,
            address_id=addr.id,
            specialty_id=specialty.id,
            urgency=urgency or "normale",
            description=description,
            contact_method=contact_method,
            marketing_consent=marketing_consent,
            sub_service=sub_service,
            status="open" if forward_to_vets else "pending_verification",
        )
        self.db.add(req)
        self.db.flush()

        matches: list[tuple[Specialist, float]] = []
        matched_specs: list[dict[str, Any]] = []

        wa_payload: Optional[dict[str, Any]] = None
        if forward_to_vets:
            user_cap = (addr.cap or "").strip() or None
            matches = self._match_specialists(
                specialty.id, city, province, animal.species, user_cap=user_cap
            )
            for sp, sc in matches:
                self.db.add(RequestMatch(request_id=req.id, specialist_id=sp.id, score=sc))
            pn = (user.profile_notes_for_vets or "").strip() or None
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
                description=description,
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
                description=description,
                matches=matched_specs,
                profile_notes=pn,
            )

        conv = Conversation(request_id=req.id, user_id=user.id)
        self.db.add(conv)
        self.db.flush()

        if forward_to_vets:
            welcome = (
                "Ciao, abbiamo ricevuto la tua richiesta. Uno specialista ti risponderà quanto prima. "
                "Controlla la mail di conferma e verifica anche lo spam."
            )
        else:
            welcome = (
                "Ciao! Abbiamo registrato la tua richiesta. Per inoltrarla ai veterinari della tua zona e "
                "cercare la prima disponibilità tra i nostri contatti, apri l'email che ti abbiamo inviato e "
                "clicca sul link di verifica. Controlla anche la cartella spam."
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

        if forward_to_vets and wa_payload is not None:
            notif = AdminNotification(
                channel="whatsapp",
                title=f"Nuova richiesta {req.id}",
                payload_json=wa_payload,
            )
            self.db.add(notif)

        self.db.commit()

        try:
            self.email.send_user_request_confirmation(
                to_email=user.email,
                user_name=user.full_name,
                request_id=str(req.id),
                verify_url=redirect_url,
            )
        except Exception:
            logger.exception("Email conferma utente fallita dopo persistenza richiesta")

        if forward_to_vets and wa_payload is not None:
            try:
                uc = (cap or "").strip() or None
                team_wa = admin_team_whatsapp_url_with_text(
                    self.settings.admin_whatsapp_url, wa_payload["whatsapp_text"]
                )
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
                    description=description,
                    matches=matched_specs,
                    whatsapp_text=wa_payload["whatsapp_text"],
                    team_whatsapp_url_with_text=team_wa,
                    user_cap=uc,
                    profile_notes=pn,
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
