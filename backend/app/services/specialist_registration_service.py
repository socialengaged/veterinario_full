"""Registrazione professionisti, deduplica e attivazione post-verifica email."""
from __future__ import annotations

import re
from datetime import datetime, timedelta, timezone
from typing import Any, List, Optional
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.security import hash_password, hash_token, new_raw_verification_token
from app.models.entities import EmailVerification, Specialist, Specialty, User, specialist_specialties


def _norm_street(s: Optional[str]) -> str:
    if not s or not str(s).strip():
        return ""
    return " ".join(str(s).strip().lower().split())


def _norm_cap(s: Optional[str]) -> str:
    if not s:
        return ""
    return re.sub(r"\D", "", str(s))[:16]


def _norm_name(s: str) -> str:
    return " ".join(s.strip().lower().split())


def find_merge_candidates(
    db: Session,
    *,
    email: str,
    full_name: str,
    city: str,
    province: str,
    cap: Optional[str],
    street_address: Optional[str],
) -> List[Specialist]:
    """Specialisti senza account collegato che potrebbero essere lo stesso soggetto."""
    el = email.strip().lower()
    pn = province.strip().upper()[:8]
    nc = _norm_name(city)
    nn = _norm_name(full_name)
    kcap = _norm_cap(cap)
    kst = _norm_street(street_address)

    q = select(Specialist).where(Specialist.user_id.is_(None))

    by_email = db.scalars(q.where(func.lower(Specialist.email) == el)).all()

    fuzzy = db.scalars(
        q.where(
            func.lower(Specialist.full_name) == nn,
            func.lower(Specialist.city) == nc,
            Specialist.province == pn,
        )
    ).all()

    out: dict[UUID, Specialist] = {}
    for sp in by_email + fuzzy:
        if kcap and _norm_cap(sp.cap) and _norm_cap(sp.cap) != kcap:
            continue
        if kst and _norm_street(sp.street_address) and _norm_street(sp.street_address) != kst:
            continue
        out[sp.id] = sp
    return list(out.values())


def _pending_profile_payload(body: Any, merge_id: Optional[UUID]) -> dict[str, Any]:
    d: dict[str, Any] = {
        "full_name": body.full_name,
        "phone": body.phone,
        "street_address": body.street_address,
        "cap": body.cap,
        "city": body.city,
        "province": body.province,
        "specialty_slugs": list(body.specialty_slugs),
        "species_tags": list(body.species_tags or []),
    }
    if merge_id is not None:
        d["merge_specialist_id"] = str(merge_id)
    return d


def register_specialist(
    db: Session,
    body: Any,
    *,
    frontend_verify_path: str,
) -> tuple[str, Optional[dict[str, Any]]]:
    """
    Ritorna ('success', None) con side-effect commit, oppure ('duplicate', {candidates}).
    In caso duplicate senza merge_candidate: solleva ValueError con messaggio o ritorna duplicate — qui ritorniamo tuple.
    """
    email_l = body.email.strip().lower()

    existing_user = db.scalar(select(User).where(func.lower(User.email) == email_l))
    if existing_user:
        raise ValueError("Un account con questa email esiste già. Accedi o usa un'altra email.")

    sp_claimed = db.scalar(select(Specialist).where(func.lower(Specialist.email) == email_l))
    if sp_claimed and sp_claimed.user_id is not None:
        raise ValueError("Questa email è già associata a un profilo professionista.")

    candidates = find_merge_candidates(
        db,
        email=body.email,
        full_name=body.full_name,
        city=body.city,
        province=body.province,
        cap=body.cap,
        street_address=body.street_address,
    )

    merge_id: Optional[UUID] = body.merge_candidate_specialist_id

    if candidates and merge_id is None:
        return (
            "duplicate",
            {
                "candidates": [
                    {
                        "id": c.id,
                        "full_name": c.full_name,
                        "email": c.email,
                        "city": c.city,
                        "province": c.province,
                        "cap": c.cap,
                        "street_address": c.street_address,
                    }
                    for c in candidates
                ]
            },
        )

    if merge_id is not None:
        cand = db.get(Specialist, merge_id)
        if not cand or cand.user_id is not None:
            raise ValueError("Profilo selezionato non disponibile per l'unione.")

    # Validate specialties
    specs: List[Specialty] = []
    for slug in body.specialty_slugs:
        sp = db.scalar(select(Specialty).where(Specialty.slug == slug.strip().lower()))
        if not sp:
            raise ValueError(f"Specialità non trovata: {slug}")
        specs.append(sp)

    raw_verify = new_raw_verification_token()
    ev_hash = hash_token(raw_verify)

    user = User(
        email=email_l,
        full_name=body.full_name.strip(),
        phone=(body.phone or "").strip() or None,
        hashed_password=hash_password(body.password),
        pending_specialist_profile=_pending_profile_payload(body, merge_id),
    )
    db.add(user)
    db.flush()

    ev = EmailVerification(
        user_id=user.id,
        token_hash=ev_hash,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    db.add(ev)

    if merge_id is None:
        spec_row = Specialist(
            email=email_l,
            full_name=body.full_name.strip(),
            city=body.city.strip(),
            province=body.province.strip().upper()[:8],
            cap=body.cap,
            street_address=body.street_address,
            phone=(body.phone or "").strip() or None,
            is_active=False,
            species_tags=list(body.species_tags or []),
            user_id=user.id,
        )
        db.add(spec_row)
        db.flush()
        for sp in specs:
            db.execute(
                specialist_specialties.insert().values(specialist_id=spec_row.id, specialty_id=sp.id)
            )

    db.commit()

    verify_url = f"{frontend_verify_path}?token={raw_verify}"
    return ("success", {"user_id": str(user.id), "verify_url": verify_url, "merge_pending": merge_id is not None})


def activate_specialist_after_email_verified(db: Session, user_id: UUID) -> None:
    """Dopo verifica email: attiva specialista o applica merge."""
    user = db.get(User, user_id)
    if not user:
        return

    pending = user.pending_specialist_profile
    merge_sid = (pending or {}).get("merge_specialist_id") if pending else None

    if merge_sid and pending:
        try:
            mid = UUID(str(merge_sid))
        except ValueError:
            mid = None
        if mid:
            sp = db.get(Specialist, mid)
            if sp and sp.user_id is None:
                sp.user_id = user.id
                sp.email = user.email
                sp.full_name = pending.get("full_name") or sp.full_name
                sp.phone = pending.get("phone") or sp.phone
                sp.city = pending.get("city") or sp.city
                sp.province = str(pending.get("province") or sp.province).strip().upper()[:8]
                sp.cap = pending.get("cap")
                sp.street_address = pending.get("street_address")
                sp.species_tags = pending.get("species_tags") or sp.species_tags
                sp.is_active = True
                db.execute(specialist_specialties.delete().where(specialist_specialties.c.specialist_id == sp.id))
                for slug in pending.get("specialty_slugs") or []:
                    spec = db.scalar(select(Specialty).where(Specialty.slug == str(slug).strip().lower()))
                    if spec:
                        db.execute(
                            specialist_specialties.insert().values(specialist_id=sp.id, specialty_id=spec.id)
                        )
                user.pending_specialist_profile = None
                db.commit()
                return

    sp_own = db.scalar(select(Specialist).where(Specialist.user_id == user_id))
    if sp_own:
        sp_own.is_active = True
        if pending:
            user.pending_specialist_profile = None
        db.commit()
