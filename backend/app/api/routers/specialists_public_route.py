from __future__ import annotations

from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.entities import Specialty
from app.schemas.specialist_registration import SpecialistRegisterBody, SpecialistRegisterResponse
from app.services.email_service import EmailService
from app.services.specialist_registration_service import register_specialist

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
