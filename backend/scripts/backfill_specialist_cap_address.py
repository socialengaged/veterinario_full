"""Backfill specialists.cap e street_address (stessi default del seed) senza rieseguire seed.

Uso dalla cartella backend con .env che punta al DB:
  python scripts/backfill_specialist_cap_address.py

Solo righe con email note da seed; usa COALESCE lato SQLAlchemy = aggiorna solo NULL.
"""
from __future__ import annotations

import sys
from pathlib import Path

_backend = Path(__file__).resolve().parent.parent
if str(_backend) not in sys.path:
    sys.path.insert(0, str(_backend))

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.entities import Specialist

# email -> (cap, street_address) come in seed.py
DEFAULTS: dict[str, tuple[str, str]] = {
    "dr.rossi.lecce@example.com": ("73100", "Via degli Acaya 12"),
    "clinica.bari@example.com": ("70121", "Via Napoli 45"),
    "ambulatorio.roma@example.com": ("00185", "Piazza San Giovanni 3"),
    "emergenze.lecce@example.com": ("73100", "Strada Statale 275 km 2"),
}


def main() -> int:
    db = SessionLocal()
    try:
        updated = 0
        for email, (cap, street) in DEFAULTS.items():
            sp = db.scalar(select(Specialist).where(Specialist.email == email))
            if not sp:
                print(f"Skip (non trovato): {email}")
                continue
            before = (sp.cap, sp.street_address)
            if sp.cap is None or (isinstance(sp.cap, str) and not sp.cap.strip()):
                sp.cap = cap
            if sp.street_address is None or (
                isinstance(sp.street_address, str) and not sp.street_address.strip()
            ):
                sp.street_address = street
            if before != (sp.cap, sp.street_address):
                updated += 1
                print(f"OK {email}: cap={sp.cap} address={sp.street_address}")
            else:
                print(f"Già valorizzato: {email}")
        db.commit()
        print(f"Fatto. Righe modificate: {updated}")
    finally:
        db.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
