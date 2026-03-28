from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class AddressOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    city: str
    province: str
    cap: Optional[str] = None
    street: Optional[str] = None
    label: Optional[str] = None
    created_at: datetime


class AnimalOutFull(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    species: str
    name: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime


class SpecialistLinkOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    full_name: str
    email: str
    city: str
    province: str
    is_active: bool


class UserProfileOut(BaseModel):
    id: UUID
    email: str
    full_name: str
    phone: Optional[str] = None
    email_verified: bool
    profile_notes_for_vets: Optional[str] = None
    addresses: List[AddressOut] = Field(default_factory=list)
    animals: List[AnimalOutFull] = Field(default_factory=list)
    linked_specialist: Optional[SpecialistLinkOut] = None


class PatchUserBody(BaseModel):
    full_name: Optional[str] = Field(None, min_length=1, max_length=255)
    phone: Optional[str] = Field(None, max_length=64)
    profile_notes_for_vets: Optional[str] = None


class AddressCreateBody(BaseModel):
    city: str = Field(min_length=1, max_length=128)
    province: str = Field(min_length=1, max_length=8)
    cap: Optional[str] = Field(None, max_length=16)
    street: Optional[str] = Field(None, max_length=512)
    label: Optional[str] = Field(None, max_length=128)


class AddressPatchBody(BaseModel):
    city: Optional[str] = Field(None, max_length=128)
    province: Optional[str] = Field(None, max_length=8)
    cap: Optional[str] = Field(None, max_length=16)
    street: Optional[str] = Field(None, max_length=512)
    label: Optional[str] = Field(None, max_length=128)


class AnimalCreateBody(BaseModel):
    species: str = Field(min_length=1, max_length=64)
    name: Optional[str] = Field(None, max_length=255)
    notes: Optional[str] = None


class AnimalPatchBody(BaseModel):
    species: Optional[str] = Field(None, max_length=64)
    name: Optional[str] = Field(None, max_length=255)
    notes: Optional[str] = None
