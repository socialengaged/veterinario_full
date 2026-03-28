from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict


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


class MessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    sender_role: str
    body: str
    created_at: datetime


class ConversationListItem(BaseModel):
    id: UUID
    request_id: UUID
    created_at: datetime
    last_message_preview: Optional[str] = None


class ConversationDetail(BaseModel):
    id: UUID
    request_id: UUID
    created_at: datetime
    messages: List[MessageOut]


class PostMessageBody(BaseModel):
    body: str
