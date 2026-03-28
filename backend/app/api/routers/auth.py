from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.security import create_access_token, hash_token, new_raw_verification_token, verify_password
from app.db.session import get_db
from app.models.entities import EmailVerification, User
from app.schemas.auth import LoginRequest, OkResponse, TokenResponse, UserPublic, VerifyEmailRequest
from app.services.email_service import EmailService
from app.services.request_service import RequestService
from app.services.specialist_registration_service import activate_specialist_after_email_verified

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.scalar(select(User).where(User.email == body.email.strip().lower()))
    if not user or not user.hashed_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token, token_type="bearer")


@router.post("/logout", response_model=OkResponse)
def logout() -> OkResponse:
    return OkResponse(ok=True)


@router.get("/me", response_model=UserPublic)
def me(user: User = Depends(get_current_user)) -> UserPublic:
    return UserPublic(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        email_verified=user.email_verified_at is not None,
    )


@router.post("/verify-email", response_model=OkResponse)
def verify_email(body: VerifyEmailRequest, db: Session = Depends(get_db)) -> OkResponse:
    th = hash_token(body.token)
    ev = db.scalar(select(EmailVerification).where(EmailVerification.token_hash == th))
    if not ev or ev.consumed_at:
        raise HTTPException(status_code=400, detail="Invalid or used token")
    if ev.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Token expired")
    u = db.get(User, ev.user_id)
    if not u:
        raise HTTPException(status_code=400, detail="User missing")
    u.email_verified_at = datetime.now(timezone.utc)
    ev.consumed_at = datetime.now(timezone.utc)
    db.commit()
    activate_specialist_after_email_verified(db, u.id)
    RequestService(db).release_pending_requests_for_user(u.id)
    return OkResponse(ok=True)


@router.post("/resend-verification", response_model=OkResponse)
def resend_verification(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> OkResponse:
    from app.core.config import get_settings

    settings = get_settings()
    raw = new_raw_verification_token()
    ev = EmailVerification(
        user_id=user.id,
        token_hash=hash_token(raw),
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    db.add(ev)
    db.commit()
    url = f"{settings.frontend_url.rstrip('/')}/verify-email?token={raw}"
    try:
        EmailService().send_user_request_confirmation(
            to_email=user.email,
            user_name=user.full_name,
            request_id="verifica",
            verify_url=url,
        )
    except Exception:
        pass
    return OkResponse(ok=True)
