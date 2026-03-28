from __future__ import annotations

from uuid import uuid4

from sqlalchemy import insert, select
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.entities import Specialty, Specialist, specialist_specialties


def seed() -> None:
    db: Session = SessionLocal()
    try:
        if db.scalar(select(Specialty).limit(1)):
            print("Seed skipped: specialties already present.")
            return

        specs = [
            Specialty(id=uuid4(), slug="visite-generali", name="Visite e check-up", category="cura"),
            Specialty(id=uuid4(), slug="chirurgia", name="Chirurgia veterinaria", category="interventi"),
            Specialty(id=uuid4(), slug="diagnostica", name="Diagnostica per immagini", category="analisi"),
            Specialty(id=uuid4(), slug="emergenze", name="Pronto soccorso veterinario", category="urgenze"),
            Specialty(id=uuid4(), slug="toelettatura", name="Toelettatura e benessere", category="estetica"),
        ]
        for s in specs:
            db.add(s)
        db.flush()

        sp1 = Specialist(
            id=uuid4(),
            email="dr.rossi.lecce@example.com",
            full_name="Dott. Rossi Lecce",
            city="Lecce",
            province="LE",
            cap="73100",
            street_address="Via degli Acaya 12",
            phone="+39 320 1111111",
            is_active=True,
            species_tags=["cane", "gatto"],
        )
        sp2 = Specialist(
            id=uuid4(),
            email="clinica.bari@example.com",
            full_name="Clinica Veterinaria Bari",
            city="Bari",
            province="BA",
            cap="70121",
            street_address="Via Napoli 45",
            phone="+39 320 2222222",
            is_active=True,
            species_tags=["cane", "gatto", "coniglio"],
        )
        sp3 = Specialist(
            id=uuid4(),
            email="ambulatorio.roma@example.com",
            full_name="Ambulatorio Roma Centro",
            city="Roma",
            province="RM",
            cap="00185",
            street_address="Piazza San Giovanni 3",
            phone="+39 320 3333333",
            is_active=True,
            species_tags=["cane"],
        )
        sp4 = Specialist(
            id=uuid4(),
            email="emergenze.lecce@example.com",
            full_name="Pronto Soccorso Lecce",
            city="Lecce",
            province="LE",
            cap="73100",
            street_address="Strada Statale 275 km 2",
            phone="+39 320 4444444",
            is_active=True,
            species_tags=[],
        )
        for sp in (sp1, sp2, sp3, sp4):
            db.add(sp)
        db.flush()

        def link(sp: Specialist, slug: str) -> None:
            spec = db.scalar(select(Specialty).where(Specialty.slug == slug))
            assert spec is not None
            db.execute(
                insert(specialist_specialties).values(specialist_id=sp.id, specialty_id=spec.id)
            )

        link(sp1, "visite-generali")
        link(sp1, "diagnostica")
        link(sp2, "chirurgia")
        link(sp2, "emergenze")
        link(sp3, "visite-generali")
        link(sp3, "toelettatura")
        link(sp4, "emergenze")
        link(sp4, "diagnostica")

        db.commit()
        print("Seed completed: specialties + specialists.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
