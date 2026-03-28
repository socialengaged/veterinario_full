from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from uuid import UUID

from sqlalchemy import and_, select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import (
    create_access_token,
    hash_token,
    new_raw_verification_token,
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
from app.services.email_service import EmailService
from app.services.whatsapp_text import build_admin_whatsapp_payload

import logging
logger = logging.getLogger(__name__)


class RequestService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.settings = get_settings()
        self.email = EmailService()

    def _get_or_create_user(self, email: str, full_name: str, phone: Optional[str]) -> User:
        user = self.db.scalar(select(User).where(User.email == email.strip().lower()))
        if user:
            user.full_name = full_name
            if phone:
                user.phone = phone
            return user
        user = User(
            email=email.strip().lower(),
            full_name=full_name,
            phone=phone,
            hashed_password=None,
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
        for sp in spec_rows:
            score = 0.0
            if sp.city.strip().lower() == city_l:
                score += 50.0
            elif sp.province.strip().lower() == prov_l:
                score += 10.0
            tags = sp.species_tags if isinstance(sp.species_tags, list) else []
            if not tags or species in tags:
                score += 40.0
            if score > 0:
                scored.append((sp, score))
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:25]

    def create_request(
        self,
        *,
        email: str,
        full_name: str,
        phone: str,
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
    ) -> dict[str, Any]:
        slug = specialty_slug.strip().lower()
        specialty = self.db.scalar(select(Specialty).where(Specialty.slug == slug))
        if not specialty:
            raise ValueError(f"Specialty not found: {specialty_slug}")

        user = self._get_or_create_user(email, full_name, phone)

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
            status="open",
        )
        self.db.add(req)
        self.db.flush()

        matches = self._match_specialists(specialty.id, city, province, animal.species)
        for sp, sc in matches:
            self.db.add(RequestMatch(request_id=req.id, specialist_id=sp.id, score=sc))

        conv = Conversation(request_id=req.id, user_id=user.id)
        self.db.add(conv)
        self.db.flush()

        welcome = (
            "Ciao, abbiamo ricevuto la tua richiesta. Uno specialista ti risponderà quanto prima. "
            "Controlla la mail di conferma e verifica anche lo spam."
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

        matched_specs = [
            {
                "id": str(sp.id),
                "name": sp.full_name,
                "city": sp.city,
                "province": sp.province,
                "score": sc,
            }
            for sp, sc in matches
        ]

        wa_payload = build_admin_whatsapp_payload(
            user_email=user.email,
            user_name=user.full_name,
            user_phone=user.phone or phone,
            animal_species=animal.species,
            animal_name=animal.name,
            city=city,
            province=province,
            specialty=specialty.name,
            urgency=urgency,
            description=description,
            matches=matched_specs,
        )

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
            self.email.send_admin_new_request(
                admin_email=self.settings.admin_email,
                user_email=user.email,
                user_name=user.full_name,
                user_phone=phone,
                animal_species=animal.species,
                city=city,
                province=province,
                specialty_name=specialty.name,
                urgency=urgency,
                description=description,
                matches=matched_specs,
                whatsapp_text=wa_payload["whatsapp_text"],
            )
        except Exception:
            logger.exception("Email delivery failed after request persisted")

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
