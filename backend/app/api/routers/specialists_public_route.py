from __future__ import annotations

import hashlib
import hmac as _hmac
import logging
from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.session import get_db
from app.models.entities import Specialist, Specialty
from app.schemas.specialist_registration import SpecialistRegisterBody, SpecialistRegisterResponse
from app.services.email_service import EmailService
from app.services.specialist_registration_service import register_specialist

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/specialists", tags=["specialists"])


class SpecialtyPublicOut(BaseModel):
    slug: str
    name: str
    category: str


@router.get("/specialties", response_model=List[SpecialtyPublicOut])
def list_specialties_public(db: Session = Depends(get_db)) -> List[SpecialtyPublicOut]:
    rows = db.scalars(select(Specialty).order_by(Specialty.category, Specialty.name)).all()
    return [SpecialtyPublicOut(slug=s.slug, name=s.name, category=s.category) for s in rows]


@router.post("/register", response_model=SpecialistRegisterResponse, status_code=status.HTTP_201_CREATED)
def register_specialist_endpoint(body: SpecialistRegisterBody, db: Session = Depends(get_db)) -> SpecialistRegisterResponse:
    if not body.terms_ack or not body.registration_consent:
        raise HTTPException(status_code=400, detail="Accettazione termini e consensi obbligatori.")
    from app.core.config import get_settings

    settings = get_settings()
    base = settings.frontend_url.rstrip("/")
    verify_path = f"{base}/verify-email"
    try:
        outcome, data = register_specialist(db, body, frontend_verify_path=verify_path)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e

    if outcome == "duplicate" and data:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=data)

    if outcome == "success" and data:
        verify_url = data.get("verify_url", "")
        try:
            EmailService().send_user_request_confirmation(
                to_email=body.email.strip().lower(),
                user_name=body.full_name.strip(),
                request_id="iscrizione-professionista",
                verify_url=verify_url,
            )
        except Exception:
            pass
        uid = UUID(data["user_id"])
        return SpecialistRegisterResponse(
            user_id=uid,
            email_verified=False,
            merge_pending=bool(data.get("merge_pending")),
        )

    raise HTTPException(status_code=500, detail="Errore registrazione")


@router.get("/optout", response_class=HTMLResponse)
def specialist_optout(
    id: UUID = Query(...),
    sig: str = Query(...),
    db: Session = Depends(get_db),
) -> HTMLResponse:
    """Opt-out: il veterinario viene disattivato (non riceve più richieste)."""
    settings = get_settings()
    secret = (settings.secret_key or "").encode()
    expected_sig = _hmac.new(secret, str(id).encode(), hashlib.sha256).hexdigest()[:16]

    if not _hmac.compare_digest(sig, expected_sig):
        return HTMLResponse(
            '<html><body style="font-family:sans-serif;text-align:center;padding:40px;">'
            "<h2>Link non valido</h2>"
            "<p>Il link di disiscrizione non è valido o è scaduto.</p>"
            "</body></html>",
            status_code=400,
        )

    specialist = db.get(Specialist, id)
    if not specialist:
        return HTMLResponse(
            '<html><body style="font-family:sans-serif;text-align:center;padding:40px;">'
            "<h2>Specialista non trovato</h2>"
            "</body></html>",
            status_code=404,
        )

    specialist.is_active = False
    db.commit()
    logger.info("Specialist opt-out: id=%s name=%s", id, specialist.full_name)

    return HTMLResponse(
        '<html><body style="font-family:sans-serif;text-align:center;padding:40px;">'
        '<div style="max-width:500px;margin:0 auto;">'
        '<h2 style="color:#0f766e;">Disiscrizione completata</h2>'
        f"<p>Gentile <strong>{specialist.full_name}</strong>,</p>"
        "<p>Non riceverai più richieste da VeterinarioVicino.it.</p>"
        "<p>Se hai cambiato idea, contattaci a "
        '<a href="mailto:seomantis@gmail.com">seomantis@gmail.com</a>.</p>'
        "</div></body></html>"
    )
