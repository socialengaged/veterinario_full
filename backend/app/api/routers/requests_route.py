from __future__ import annotations

import json

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import ValidationError
from sqlalchemy.orm import Session
from starlette.datastructures import UploadFile

from app.db.session import get_db
from app.schemas.requests import CreateRequestBody, CreateRequestResponse
from app.services.request_service import RequestService
from app.services.request_uploads import REQUEST_UPLOAD_MAX_FILES, validate_upload_bytes

router = APIRouter(tags=["requests"])


@router.post("/requests", response_model=CreateRequestResponse)
async def create_request(request: Request, db: Session = Depends(get_db)) -> CreateRequestResponse:
    ct = (request.headers.get("content-type") or "").lower()
    files: list[tuple[str, bytes, str]] = []

    if "multipart/form-data" in ct:
        form = await request.form()
        raw_payload = form.get("payload")
        if not raw_payload or not isinstance(raw_payload, str):
            raise HTTPException(status_code=400, detail="Campo multipart 'payload' (JSON) richiesto.")
        try:
            body = CreateRequestBody.model_validate_json(raw_payload)
        except ValidationError as e:
            raise HTTPException(status_code=422, detail=json.loads(e.json())) from e

        for _key, item in form.multi_items():
            if _key != "files":
                continue
            if not isinstance(item, UploadFile):
                continue
            data = await item.read()
            fn = item.filename or "file.bin"
            ctype = item.content_type or "application/octet-stream"
            try:
                validate_upload_bytes(fn, data)
            except ValueError as ve:
                raise HTTPException(status_code=400, detail=str(ve)) from ve
            files.append((fn, data, ctype))

        if len(files) > REQUEST_UPLOAD_MAX_FILES:
            raise HTTPException(
                status_code=400,
                detail=f"Troppi allegati (massimo {REQUEST_UPLOAD_MAX_FILES}).",
            )
        if files and not body.consultation_online:
            raise HTTPException(
                status_code=400,
                detail="Gli allegati sono consentiti solo per la consulenza veterinaria online.",
            )
    else:
        try:
            raw = await request.json()
        except Exception as e:
            raise HTTPException(status_code=400, detail="Body JSON non valido.") from e
        try:
            body = CreateRequestBody.model_validate(raw)
        except ValidationError as e:
            raise HTTPException(status_code=422, detail=json.loads(e.json())) from e

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
            uploaded_files=files if files else None,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return CreateRequestResponse(**out)
