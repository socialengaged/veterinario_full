from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class VerifyEmailRequest(BaseModel):
    token: str = Field(min_length=10)


class UserPublic(BaseModel):
    id: UUID
    email: str
    full_name: str
    phone: Optional[str] = None
    email_verified: bool

    class Config:
        from_attributes = True


class OkResponse(BaseModel):
    ok: bool = True
