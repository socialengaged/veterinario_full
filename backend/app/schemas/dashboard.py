from __future__ import annotations

from datetime import datetime
from typing import Any, List, Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class AnimalOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    species: str
    name: Optional[str]
    notes: Optional[str] = None
    created_at: datetime


class RequestSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    status: str
    urgency: str
    created_at: datetime
    specialty_slug: Optional[str] = None
    specialty_name: Optional[str] = None
    conversation_id: Optional[UUID] = None
    description_preview: Optional[str] = None
    description: Optional[str] = None
    animal_species: Optional[str] = None
    animal_name: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    cap: Optional[str] = None
    contact_method: Optional[str] = None
    sub_service: Optional[str] = None


class RequestContextOut(BaseModel):
    """Riepilogo richiesta collegata alla conversazione (per UI)."""

    request_id: UUID
    status: str
    urgency: str
    created_at: datetime
    specialty_name: str
    specialty_slug: str
    animal_species: str
    animal_name: Optional[str] = None
    city: str
    province: str
    cap: Optional[str] = None
    description: Optional[str] = None
    contact_method: str
    sub_service: Optional[str] = None


class MessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: UUID
    sender_role: str
    body: str
    created_at: datetime
    metadata: Optional[Any] = Field(default=None, validation_alias="message_metadata")
    tokens_count: Optional[int] = None


class ConversationListItem(BaseModel):
    id: UUID
    request_id: UUID
    created_at: datetime
    last_message_preview: Optional[str] = None
    specialty_name: Optional[str] = None


class ConversationDetail(BaseModel):
    id: UUID
    request_id: UUID
    created_at: datetime
    messages: List[MessageOut]
    request_context: Optional[RequestContextOut] = None


class PostMessageBody(BaseModel):
    body: str
