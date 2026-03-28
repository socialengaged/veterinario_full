from __future__ import annotations

from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import Animal, Specialty, User, VetRequest
from app.schemas.dashboard import AnimalOut, RequestSummary

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me/requests", response_model=List[RequestSummary])
def my_requests(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> List[RequestSummary]:
    rows = db.execute(
        select(VetRequest, Specialty)
        .join(Specialty, VetRequest.specialty_id == Specialty.id)
        .where(VetRequest.user_id == user.id)
        .order_by(VetRequest.created_at.desc())
    ).all()
    out: List[RequestSummary] = []
    for req, spec in rows:
        out.append(
            RequestSummary(
                id=req.id,
                status=req.status,
                urgency=req.urgency,
                created_at=req.created_at,
                specialty_slug=spec.slug,
            )
        )
    return out


@router.get("/me/animals", response_model=List[AnimalOut])
def my_animals(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> List[AnimalOut]:
    rows = db.scalars(select(Animal).where(Animal.user_id == user.id).order_by(Animal.created_at.desc())).all()
    return [AnimalOut.model_validate(a) for a in rows]
