from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
from typing_extensions import Self


class AnimalIn(BaseModel):
    species: str = Field(min_length=1, max_length=64)
    name: Optional[str] = Field(default=None, max_length=255)


# Codici servizio client → slug DB (vedi scripts/seed.py + taxonomy frontend)
SERVICE_TO_SPECIALTY_SLUG: dict[str, str] = {
    "visita_generica": "visite-generali",
    "visite-generali": "visite-generali",
    "visita": "visite-generali",
    "chirurgia": "chirurgia",
    "diagnostica": "diagnostica",
    "analisi": "diagnostica",
    "specialistica": "visite-generali",
    "prevenzione": "visite-generali",
    "nutrizione": "visite-generali",
    "emergenza": "emergenze",
    "emergenze": "emergenze",
    "riabilitazione": "visite-generali",
    "odontoiatria": "chirurgia",
    "cura": "visite-generali",
    "animali_esotici": "visite-generali",
    "animali-esotici": "visite-generali",
    "rurale": "visite-generali",
    "toelettatura": "toelettatura",
    "consultazione_online": "visite-generali",
}


class CreateRequestBody(BaseModel):
    """Accetta payload flat (legacy) o annidato (QA / frontend)."""

    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=64)
    city: str = Field(min_length=1, max_length=128)
    province: str = Field(min_length=1, max_length=8)
    cap: Optional[str] = Field(default=None, max_length=16)
    urgency: str = Field(default="normale", max_length=64)
    description: Optional[str] = None
    contact_secondary: Optional[str] = Field(default=None, max_length=16)
    contact_method: Optional[str] = Field(default=None, max_length=32)
    email_verification_ack: bool = False
    registration_consent: bool = False
    marketing_consent: bool = False
    sub_service: Optional[str] = None

    full_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=128)
    last_name: Optional[str] = Field(default=None, max_length=128)

    animal_species: Optional[str] = Field(default=None, max_length=64)
    animal_name: Optional[str] = Field(default=None, max_length=255)
    animal: Optional[AnimalIn] = None

    specialty_slug: Optional[str] = Field(default=None, max_length=128)
    service: Optional[str] = Field(default=None, max_length=128)

    password: Optional[str] = Field(default=None, max_length=128)

    source_page: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None

    consultation_online: bool = False
    """True se la richiesta è per consulenza veterinaria online (cani/gatti, tariffe dedicate)."""
    consultation_tier: Optional[str] = Field(
        default=None,
        max_length=32,
        description="std_15_30 | std_30_50 | specialist_100",
    )

    @field_validator("password")
    @classmethod
    def password_min_length_if_set(cls, v: Optional[str]) -> Optional[str]:
        if v is None or (isinstance(v, str) and not v.strip()):
            return None
        if len(v) < 8:
            raise ValueError("La password deve essere di almeno 8 caratteri")
        return v

    @field_validator("phone")
    @classmethod
    def phone_optional(cls, v: Optional[str]) -> Optional[str]:
        if v is None or not str(v).strip():
            return None
        s = str(v).strip()
        if len(s) < 3:
            raise ValueError("Numero di telefono non valido")
        return s

    @model_validator(mode="after")
    def normalize(self) -> Self:
        if self.first_name is not None or self.last_name is not None:
            parts = [self.first_name or "", self.last_name or ""]
            merged = " ".join(p.strip() for p in parts if p and p.strip()).strip()
            if merged:
                self.full_name = merged
        if not self.full_name or not str(self.full_name).strip():
            raise ValueError("Fornire full_name oppure first_name e/o last_name")

        if self.animal is not None:
            self.animal_species = self.animal.species.strip().lower()
            self.animal_name = self.animal.name

        if not self.animal_species or not str(self.animal_species).strip():
            raise ValueError("Fornire animal.species oppure animal_species")

        self.animal_species = self.animal_species.strip().lower()
        self.full_name = self.full_name.strip()

        if self.service and not self.specialty_slug:
            key = self.service.strip().lower().replace("-", "_")
            self.specialty_slug = SERVICE_TO_SPECIALTY_SLUG.get(
                key,
                self.service.strip().lower().replace("_", "-"),
            )
        if not self.specialty_slug or not str(self.specialty_slug).strip():
            raise ValueError("Fornire specialty_slug oppure service")

        self.specialty_slug = self.specialty_slug.strip().lower()

        sec = (self.contact_secondary or "").strip().lower() or None
        if sec is not None and sec not in ("sms", "whatsapp"):
            raise ValueError("contact_secondary deve essere sms o whatsapp")
        self.contact_secondary = sec
        if sec in ("sms", "whatsapp"):
            if not self.phone:
                raise ValueError(
                    "Numero di cellulare obbligatorio se scegli anche SMS o WhatsApp come canale di contatto."
                )
        if sec is not None:
            self.contact_method = f"email+{sec}"
        elif self.contact_method is None or not str(self.contact_method).strip():
            self.contact_method = "email"

        if not self.email_verification_ack:
            raise ValueError(
                "Conferma di aver compreso che devi verificare l'email (anche in spam) per l'inoltro ai veterinari."
            )
        if not self.registration_consent:
            raise ValueError(
                "Conferma di volerti registrare al sito con questa email e password per accedere alla chat."
            )

        if self.consultation_online:
            if self.animal_species not in ("cane", "gatto"):
                raise ValueError("La consulenza online è disponibile solo per cani e gatti.")
            if self.consultation_tier not in ("std_15_30", "std_30_50", "specialist_100"):
                raise ValueError("Seleziona una tariffa valida per la consulenza online.")
            sv = (self.service or "").strip().lower().replace("-", "_")
            if sv != "consultazione_online":
                raise ValueError("Servizio non valido per consulenza online.")
        elif self.consultation_tier is not None and str(self.consultation_tier).strip():
            raise ValueError("Il campo tariffa online non è ammesso senza consulenza online.")

        return self


class CreateRequestResponse(BaseModel):
    success: bool
    ok: bool = True
    warning: Optional[str] = None
    user_id: str
    request_id: str
    conversation_id: str
    email_verified: bool
    redirect_url: str
    access_token: str
    token_type: str = "bearer"
