"""Admin endpoints — autenticati con header X-Admin-Key."""
from __future__ import annotations

import hmac
import hashlib
import logging
from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import get_settings, Settings
from app.db.session import get_db
from app.models.entities import (
    Conversation,
    Message,
    MessageSenderRole,
    RequestMatch,
    Specialist,
    User,
    VetRequest,
)
from app.services.email_service import EmailService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])


def _verify_admin_key(
    x_admin_key: str = Header(..., alias="X-Admin-Key"),
    settings: Settings = Depends(get_settings),
) -> None:
    expected = (settings.admin_api_key or "").encode()
    provided = (x_admin_key or "").encode()
    if not expected or not hmac.compare_digest(provided, expected):
        raise HTTPException(status_code=403, detail="Invalid admin key")


# ---------------------------------------------------------------------------
# Stats
# ---------------------------------------------------------------------------

@router.get("/stats")
def admin_stats(
    db: Session = Depends(get_db),
    _: None = Depends(_verify_admin_key),
) -> dict[str, Any]:
    specialists_total = db.execute(select(func.count(Specialist.id))).scalar() or 0
    from sqlalchemy import text as _text
    specialists_with_email = db.execute(
        _text(
            "SELECT COUNT(*) FROM specialists "
            "WHERE contact_email IS NOT NULL "
            "AND contact_email NOT LIKE '%@noemail.local'"
        )
    ).scalar() or 0
    requests_total = db.execute(select(func.count(VetRequest.id))).scalar() or 0
    matches_total = db.execute(select(func.count(RequestMatch.request_id))).scalar() or 0
    matches_contacted = db.execute(
        select(func.count(RequestMatch.request_id)).where(RequestMatch.contacted.is_(True))
    ).scalar() or 0
    return {
        "specialists_total": specialists_total,
        "specialists_with_email": specialists_with_email,
        "requests_total": requests_total,
        "matches_total": matches_total,
        "matches_contacted": matches_contacted,
    }


# ---------------------------------------------------------------------------
# Requests list
# ---------------------------------------------------------------------------

@router.get("/requests")
def admin_requests(
    db: Session = Depends(get_db),
    _: None = Depends(_verify_admin_key),
    limit: int = Query(50, le=200),
    offset: int = Query(0, ge=0),
) -> list[dict[str, Any]]:
    reqs = db.execute(
        select(VetRequest)
        .order_by(VetRequest.created_at.desc())
        .limit(limit)
        .offset(offset)
    ).scalars().all()
    result = []
    for r in reqs:
        user = db.get(User, r.user_id)
        result.append({
            "id": str(r.id),
            "status": r.status,
            "urgency": r.urgency,
            "created_at": r.created_at.isoformat() if r.created_at else None,
            "user_email": user.email if user else None,
            "user_name": user.full_name if user else None,
        })
    return result


# ---------------------------------------------------------------------------
# Matches per request
# ---------------------------------------------------------------------------

@router.get("/matches")
def admin_matches(
    request_id: UUID = Query(...),
    db: Session = Depends(get_db),
    _: None = Depends(_verify_admin_key),
) -> list[dict[str, Any]]:
    matches = db.execute(
        select(RequestMatch).where(RequestMatch.request_id == request_id)
    ).scalars().all()
    result = []
    for m in matches:
        sp = db.get(Specialist, m.specialist_id)
        result.append({
            "match_id": f"{m.request_id}_{m.specialist_id}",
            "specialist_id": str(m.specialist_id),
            "specialist_name": sp.full_name if sp else None,
            "specialist_email": sp.contact_email if sp else None,
            "specialist_phone": sp.phone_mobile if sp else None,
            "score": m.score,
            "contacted": m.contacted,
            "contacted_at": m.contacted_at.isoformat() if m.contacted_at else None,
            "outcome": m.outcome,
        })
    return result


# ---------------------------------------------------------------------------
# POST specialist-message (inserisce risposta vet in chat)
# ---------------------------------------------------------------------------

class SpecialistMessageBody(BaseModel):
    specialist_id: UUID
    body: str


@router.post("/conversations/{conv_id}/specialist-message")
def admin_specialist_message(
    conv_id: UUID,
    payload: SpecialistMessageBody,
    db: Session = Depends(get_db),
    _: None = Depends(_verify_admin_key),
) -> dict[str, Any]:
    conv = db.get(Conversation, conv_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    specialist = db.get(Specialist, payload.specialist_id)
    if not specialist:
        raise HTTPException(status_code=404, detail="Specialist not found")

    msg = Message(
        conversation_id=conv.id,
        sender_role=MessageSenderRole.specialist.value,
        body=payload.body.strip(),
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)

    # Notifica utente via email
    user = db.get(User, conv.user_id)
    if user and user.email:
        settings = get_settings()
        chat_url = f"{settings.frontend_url.rstrip('/')}/dashboard/chat/{conv.id}"
        try:
            email_svc = EmailService()
            email_svc.send_specialist_reply_notification(
                to_email=user.email,
                user_name=user.full_name or "",
                specialist_name=specialist.full_name or "Un veterinario",
                message_preview=payload.body.strip()[:500],
                chat_url=chat_url,
            )
        except Exception:
            logger.exception("Email notifica risposta vet fallita: user=%s", user.email)

    return {
        "message_id": str(msg.id),
        "conversation_id": str(conv.id),
        "sender_role": "specialist",
        "created_at": msg.created_at.isoformat() if msg.created_at else None,
    }


# ---------------------------------------------------------------------------
# POST match outcome update
# ---------------------------------------------------------------------------

class MatchOutcomeBody(BaseModel):
    outcome: str  # success | no_answer | busy | refused


@router.post("/match/{match_id}/update")
def admin_match_update(
    match_id: str,
    payload: MatchOutcomeBody,
    db: Session = Depends(get_db),
    _: None = Depends(_verify_admin_key),
) -> dict[str, str]:
    # match_id format: request_id_specialist_id
    parts = match_id.split("_", 1)
    if len(parts) != 2:
        raise HTTPException(status_code=400, detail="Invalid match_id format")
    try:
        req_id = UUID(parts[0])
        sp_id = UUID(parts[1])
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID in match_id")

    match = db.scalar(
        select(RequestMatch).where(
            RequestMatch.request_id == req_id,
            RequestMatch.specialist_id == sp_id,
        )
    )
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    match.outcome = payload.outcome
    db.commit()
    return {"status": "updated", "outcome": payload.outcome}
