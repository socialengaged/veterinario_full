from __future__ import annotations

from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import Animal, Specialist, Specialty, User, UserAddress, VetRequest
from app.schemas.dashboard import AnimalOut, RequestSummary
from app.schemas.profile import (
    AddressCreateBody,
    AddressOut,
    AddressPatchBody,
    AnimalCreateBody,
    AnimalOutFull,
    AnimalPatchBody,
    PatchUserBody,
    SpecialistLinkOut,
    UserProfileOut,
)

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me/profile", response_model=UserProfileOut)
def my_profile(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserProfileOut:
    db.refresh(user)
    addrs = db.scalars(select(UserAddress).where(UserAddress.user_id == user.id).order_by(UserAddress.created_at.desc())).all()
    animals = db.scalars(select(Animal).where(Animal.user_id == user.id).order_by(Animal.created_at.desc())).all()
    sp = db.scalar(select(Specialist).where(Specialist.user_id == user.id))
    linked = None
    if sp:
        linked = SpecialistLinkOut(
            id=sp.id,
            full_name=sp.full_name,
            email=sp.email,
            city=sp.city,
            province=sp.province,
            is_active=sp.is_active,
        )
    return UserProfileOut(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        email_verified=user.email_verified_at is not None,
        profile_notes_for_vets=user.profile_notes_for_vets,
        addresses=[AddressOut.model_validate(a) for a in addrs],
        animals=[AnimalOutFull.model_validate(a) for a in animals],
        linked_specialist=linked,
    )


@router.patch("/me", response_model=UserProfileOut)
def patch_me(
    body: PatchUserBody,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserProfileOut:
    if body.full_name is not None:
        user.full_name = body.full_name.strip()
    if body.phone is not None:
        user.phone = body.phone.strip() or None
    if body.profile_notes_for_vets is not None:
        user.profile_notes_for_vets = body.profile_notes_for_vets
    db.commit()
    db.refresh(user)
    addrs = db.scalars(select(UserAddress).where(UserAddress.user_id == user.id).order_by(UserAddress.created_at.desc())).all()
    animals = db.scalars(select(Animal).where(Animal.user_id == user.id).order_by(Animal.created_at.desc())).all()
    sp = db.scalar(select(Specialist).where(Specialist.user_id == user.id))
    linked = None
    if sp:
        linked = SpecialistLinkOut(
            id=sp.id,
            full_name=sp.full_name,
            email=sp.email,
            city=sp.city,
            province=sp.province,
            is_active=sp.is_active,
        )
    return UserProfileOut(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        email_verified=user.email_verified_at is not None,
        profile_notes_for_vets=user.profile_notes_for_vets,
        addresses=[AddressOut.model_validate(a) for a in addrs],
        animals=[AnimalOutFull.model_validate(a) for a in animals],
        linked_specialist=linked,
    )


@router.post("/me/addresses", response_model=AddressOut)
def create_address(
    body: AddressCreateBody,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AddressOut:
    a = UserAddress(
        user_id=user.id,
        city=body.city.strip(),
        province=body.province.strip().upper()[:8],
        cap=body.cap,
        street=body.street,
        label=body.label,
    )
    db.add(a)
    db.commit()
    db.refresh(a)
    return AddressOut.model_validate(a)


@router.patch("/me/addresses/{address_id}", response_model=AddressOut)
def patch_address(
    address_id: UUID,
    body: AddressPatchBody,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AddressOut:
    a = db.get(UserAddress, address_id)
    if not a or a.user_id != user.id:
        raise HTTPException(status_code=404, detail="Indirizzo non trovato")
    if body.city is not None:
        a.city = body.city.strip()
    if body.province is not None:
        a.province = body.province.strip().upper()[:8]
    if body.cap is not None:
        a.cap = body.cap
    if body.street is not None:
        a.street = body.street
    if body.label is not None:
        a.label = body.label
    db.commit()
    db.refresh(a)
    return AddressOut.model_validate(a)


@router.delete("/me/addresses/{address_id}", status_code=204)
def delete_address(
    address_id: UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Response:
    a = db.get(UserAddress, address_id)
    if not a or a.user_id != user.id:
        raise HTTPException(status_code=404, detail="Indirizzo non trovato")
    n = db.scalar(select(VetRequest.id).where(VetRequest.address_id == address_id).limit(1))
    if n:
        raise HTTPException(
            status_code=409,
            detail="Indirizzo collegato a una richiesta passata: non può essere eliminato.",
        )
    db.delete(a)
    db.commit()
    return Response(status_code=204)


@router.post("/me/animals", response_model=AnimalOutFull)
def create_animal(
    body: AnimalCreateBody,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AnimalOutFull:
    an = Animal(
        user_id=user.id,
        species=body.species.strip().lower(),
        name=body.name,
        notes=body.notes,
    )
    db.add(an)
    db.commit()
    db.refresh(an)
    return AnimalOutFull.model_validate(an)


@router.patch("/me/animals/{animal_id}", response_model=AnimalOutFull)
def patch_animal(
    animal_id: UUID,
    body: AnimalPatchBody,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AnimalOutFull:
    an = db.get(Animal, animal_id)
    if not an or an.user_id != user.id:
        raise HTTPException(status_code=404, detail="Animale non trovato")
    if body.species is not None:
        an.species = body.species.strip().lower()
    if body.name is not None:
        an.name = body.name
    if body.notes is not None:
        an.notes = body.notes
    db.commit()
    db.refresh(an)
    return AnimalOutFull.model_validate(an)


@router.delete("/me/animals/{animal_id}", status_code=204)
def delete_animal(
    animal_id: UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Response:
    an = db.get(Animal, animal_id)
    if not an or an.user_id != user.id:
        raise HTTPException(status_code=404, detail="Animale non trovato")
    n = db.scalar(select(VetRequest.id).where(VetRequest.animal_id == animal_id).limit(1))
    if n:
        raise HTTPException(
            status_code=409,
            detail="Animale collegato a una richiesta passata: non può essere eliminato.",
        )
    db.delete(an)
    db.commit()
    return Response(status_code=204)


@router.get("/me/requests", response_model=List[RequestSummary])
def my_requests(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> List[RequestSummary]:
    reqs = (
        db.scalars(
            select(VetRequest)
            .where(VetRequest.user_id == user.id)
            .options(
                selectinload(VetRequest.specialty),
                selectinload(VetRequest.animal),
                selectinload(VetRequest.address),
                selectinload(VetRequest.conversation),
            )
            .order_by(VetRequest.created_at.desc())
        )
    ).all()
    out: List[RequestSummary] = []
    for req in reqs:
        spec = req.specialty
        if not spec:
            continue
        conv = req.conversation
        animal = req.animal
        addr = req.address
        desc = (req.description or "").strip()
        preview: str | None = None
        if desc:
            preview = desc[:120] + ("…" if len(desc) > 120 else "")
        cap_val = None
        if addr and (addr.cap or "").strip():
            cap_val = (addr.cap or "").strip()
        out.append(
            RequestSummary(
                id=req.id,
                status=req.status,
                urgency=req.urgency,
                created_at=req.created_at,
                specialty_slug=spec.slug,
                specialty_name=spec.name,
                conversation_id=conv.id if conv else None,
                description_preview=preview,
                description=req.description,
                animal_species=animal.species if animal else None,
                animal_name=animal.name if animal else None,
                city=addr.city if addr else None,
                province=addr.province if addr else None,
                cap=cap_val,
                contact_method=req.contact_method,
                sub_service=req.sub_service,
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
