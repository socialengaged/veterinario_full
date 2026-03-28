from __future__ import annotations

from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class SpecialistCandidateOut(BaseModel):
    id: UUID
    full_name: str
    email: str
    city: str
    province: str
    cap: Optional[str] = None
    street_address: Optional[str] = None


class SpecialistRegisterBody(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: str = Field(min_length=2, max_length=255)
    phone: Optional[str] = Field(None, max_length=64)
    street_address: Optional[str] = Field(None, max_length=512)
    cap: Optional[str] = Field(None, max_length=16)
    city: str = Field(min_length=1, max_length=128)
    province: str = Field(min_length=2, max_length=8)
    specialty_slugs: List[str] = Field(min_length=1)
    species_tags: List[str] = Field(default_factory=list, max_length=50)
    terms_ack: bool = Field(..., description="Accettazione termini veterinari")
    registration_consent: bool = Field(..., description="Consenso trattamento dati")
    merge_candidate_specialist_id: Optional[UUID] = None


class SpecialistRegisterResponse(BaseModel):
    success: bool = True
    user_id: UUID
    email_verified: bool = False
    verify_url_hint: str = "Controlla la email per il link di verifica."
    merge_pending: bool = False


class SpecialistDuplicateResponse(BaseModel):
    need_merge_confirm: bool = True
    candidates: List[SpecialistCandidateOut]
