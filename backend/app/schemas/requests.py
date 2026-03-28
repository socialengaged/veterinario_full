from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, EmailStr, Field, model_validator
from typing_extensions import Self


class AnimalIn(BaseModel):
    species: str = Field(min_length=1, max_length=64)
    name: Optional[str] = Field(default=None, max_length=255)


# Codici servizio client → slug DB (vedi scripts/seed.py)
SERVICE_TO_SPECIALTY_SLUG: dict[str, str] = {
    "visita_generica": "visite-generali",
    "visite-generali": "visite-generali",
    "chirurgia": "chirurgia",
    "diagnostica": "diagnostica",
    "emergenze": "emergenze",
    "toelettatura": "toelettatura",
}


class CreateRequestBody(BaseModel):
    """Accetta payload flat (legacy) o annidato (QA / frontend)."""

    email: EmailStr
    phone: str = Field(min_length=3, max_length=64)
    city: str = Field(min_length=1, max_length=128)
    province: str = Field(min_length=1, max_length=8)
    cap: Optional[str] = Field(default=None, max_length=16)
    urgency: str = Field(default="normale", max_length=64)
    description: Optional[str] = None
    contact_method: str = Field(default="telefono", max_length=32)
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
        return self


class CreateRequestResponse(BaseModel):
    success: bool
    user_id: str
    request_id: str
    conversation_id: str
    email_verified: bool
    redirect_url: str
    access_token: str
    token_type: str = "bearer"
