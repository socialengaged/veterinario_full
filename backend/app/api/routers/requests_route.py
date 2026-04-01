from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.requests import CreateRequestBody, CreateRequestResponse
from app.services.request_service import RequestService

router = APIRouter(tags=["requests"])


@router.post("/requests", response_model=CreateRequestResponse)
def create_request(body: CreateRequestBody, db: Session = Depends(get_db)) -> CreateRequestResponse:
    svc = RequestService(db)
    try:
        out = svc.create_request(
            email=body.email,
            full_name=body.full_name,
            phone=body.phone or None,
            animal_species=body.animal_species,
            animal_name=body.animal_name,
            city=body.city,
            province=body.province,
            cap=body.cap,
            specialty_slug=body.specialty_slug,
            sub_service=body.sub_service,
            urgency=body.urgency,
            description=body.description,
            contact_method=body.contact_method,
            marketing_consent=body.marketing_consent,
            password_plain=body.password,
            consultation_online=body.consultation_online,
            consultation_tier=body.consultation_tier,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return CreateRequestResponse(**out)
