from __future__ import annotations

from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import Conversation, Message, MessageSenderRole, User
from app.schemas.dashboard import (
    ConversationDetail,
    ConversationListItem,
    MessageOut,
    PostMessageBody,
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
    return ConversationDetail(
        id=c.id,
        request_id=c.request_id,
        created_at=c.created_at,
        messages=[MessageOut.model_validate(m) for m in msgs],
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
