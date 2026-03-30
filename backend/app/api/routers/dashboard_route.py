from __future__ import annotations

from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import Animal, Conversation, Message, MessageSenderRole, Specialty, User, UserAddress, VetRequest
from app.schemas.dashboard import (
    ConversationDetail,
    ConversationListItem,
    MessageOut,
    PostMessageBody,
    RequestContextOut,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/chats", response_model=List[ConversationListItem])
def list_chats(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> List[ConversationListItem]:
    convs = db.scalars(
        select(Conversation).where(Conversation.user_id == user.id).order_by(Conversation.created_at.desc())
    ).all()
    spec_by_req: dict[UUID, str] = {}
    if convs:
        rids = [c.request_id for c in convs]
        pairs = db.execute(
            select(VetRequest.id, Specialty.name)
            .join(Specialty, VetRequest.specialty_id == Specialty.id)
            .where(VetRequest.id.in_(rids))
        ).all()
        spec_by_req = {vid: name for vid, name in pairs}

    out: List[ConversationListItem] = []
    for c in convs:
        last = db.scalars(
            select(Message)
            .where(Message.conversation_id == c.id)
            .order_by(Message.created_at.desc())
            .limit(1)
        ).first()
        preview = last.body[:120] if last else None
        out.append(
            ConversationListItem(
                id=c.id,
                request_id=c.request_id,
                created_at=c.created_at,
                last_message_preview=preview,
                specialty_name=spec_by_req.get(c.request_id),
            )
        )
    return out


@router.get("/chats/{conversation_id}", response_model=ConversationDetail)
def get_chat(
    conversation_id: UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ConversationDetail:
    c = db.get(Conversation, conversation_id)
    if not c or c.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    msgs = db.scalars(
        select(Message).where(Message.conversation_id == c.id).order_by(Message.created_at.asc())
    ).all()
    req_ctx: RequestContextOut | None = None
    vr = db.get(VetRequest, c.request_id)
    if vr:
        spec = db.get(Specialty, vr.specialty_id)
        animal = db.get(Animal, vr.animal_id)
        addr = db.get(UserAddress, vr.address_id)
        if spec and animal and addr:
            req_ctx = RequestContextOut(
                request_id=vr.id,
                status=vr.status,
                urgency=vr.urgency,
                created_at=vr.created_at,
                specialty_name=spec.name,
                specialty_slug=spec.slug,
                animal_species=animal.species,
                animal_name=animal.name,
                city=addr.city,
                province=addr.province,
                cap=(addr.cap or "").strip() or None,
                description=vr.description,
                contact_method=vr.contact_method,
                sub_service=vr.sub_service,
            )
    return ConversationDetail(
        id=c.id,
        request_id=c.request_id,
        created_at=c.created_at,
        messages=[MessageOut.model_validate(m) for m in msgs],
        request_context=req_ctx,
    )


@router.post("/chats/{conversation_id}/messages", response_model=MessageOut)
def post_message(
    conversation_id: UUID,
    body: PostMessageBody,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> MessageOut:
    c = db.get(Conversation, conversation_id)
    if not c or c.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    m = Message(
        conversation_id=c.id,
        sender_role=MessageSenderRole.user.value,
        body=body.body.strip(),
    )
    db.add(m)
    db.commit()
    db.refresh(m)
    return MessageOut.model_validate(m)
