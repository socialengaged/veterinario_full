#!/usr/bin/env python3
"""Import specialist da dataset frontend (veterinari.csv) → tabella `specialists`.

Allinea directory SEO con matching reale. Dati da CSV reale (nessun nome inventato);
email sintetiche solo dove il CSV non fornisce email: `{slug_nome}_{city_slug}@noemail.local`.

Uso (dalla cartella backend):
  python scripts/import_from_frontend_dataset.py --dry-run
  python scripts/import_from_frontend_dataset.py --dry-run --city Lecce --limit 20
  python scripts/import_from_frontend_dataset.py --city Lecce --limit 20
  python scripts/import_from_frontend_dataset.py --offset 100 --limit 50
  python scripts/import_from_frontend_dataset.py --csv /path/to/veterinari.csv

Deploy OVH (dopo scp di script + CSV):
  cd /var/www/veterinari/backend && source venv/bin/activate
  python scripts/import_from_frontend_dataset.py
"""
from __future__ import annotations

import argparse
import csv
import re
import sys
import unicodedata
import uuid
from pathlib import Path

from sqlalchemy import func, insert, select
from sqlalchemy.orm import Session

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND) not in sys.path:
    sys.path.insert(0, str(_BACKEND))

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialty, Specialist, specialist_specialties  # noqa: E402

# Dataset default: stesso file usato dal frontend (build-time)
DEFAULT_CSV = _BACKEND.parent / "veterinari_frontend" / "src" / "data" / "veterinari.csv"

BATCH_SIZE = 100

# Codici provincia allineati a veterinari_frontend/src/data/province-codes.ts
IT_PROVINCE_CODES: frozenset[str] = frozenset(
    {
        "AG",
        "AL",
        "AN",
        "AO",
        "AP",
        "AQ",
        "AR",
        "AT",
        "AV",
        "BA",
        "BG",
        "BI",
        "BL",
        "BN",
        "BO",
        "BR",
        "BS",
        "BT",
        "BZ",
        "CA",
        "CB",
        "CE",
        "CH",
        "CL",
        "CN",
        "CO",
        "CR",
        "CS",
        "CT",
        "CZ",
        "EN",
        "FC",
        "FE",
        "FG",
        "FI",
        "FM",
        "FR",
        "GE",
        "GO",
        "GR",
        "IM",
        "IS",
        "KR",
        "LC",
        "LE",
        "LI",
        "LO",
        "LT",
        "LU",
        "MB",
        "MC",
        "ME",
        "MI",
        "MN",
        "MO",
        "MS",
        "MT",
        "NA",
        "NO",
        "NU",
        "OR",
        "PA",
        "PC",
        "PD",
        "PE",
        "PG",
        "PI",
        "PN",
        "PO",
        "PR",
        "PT",
        "PU",
        "PV",
        "PZ",
        "RA",
        "RC",
        "RE",
        "RG",
        "RI",
        "RM",
        "RN",
        "RO",
        "SA",
        "SI",
        "SO",
        "SP",
        "SR",
        "SS",
        "SU",
        "SV",
        "TA",
        "TE",
        "TN",
        "TO",
        "TP",
        "TR",
        "TS",
        "TV",
        "UD",
        "VA",
        "VB",
        "VC",
        "VE",
        "VI",
        "VR",
        "VT",
        "VV",
    }
)

EXTRA_SPECIALTIES: list[tuple[str, str, str]] = [
    ("domicilio", "Veterinario a domicilio", "cura"),
]


def to_slug(s: str) -> str:
    s = (s or "").strip().lower()
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[''`]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return s[:120] if s else "sconosciuto"


def norm_cap(raw: str) -> str | None:
    d = re.sub(r"\D", "", (raw or "").strip())
    if not d:
        return None
    return d[:16]


def extract_cap_from_address(address: str) -> str | None:
    m = re.search(r"\b(\d{5})\b", address or "")
    return m.group(1) if m else None


def norm_city(raw: str) -> str:
    t = (raw or "").strip()
    if not t:
        return ""
    return t.title()


def ensure_extra_specialties(db: Session) -> None:
    for slug, name, category in EXTRA_SPECIALTIES:
        exists = db.scalar(select(Specialty.id).where(Specialty.slug == slug).limit(1))
        if exists:
            continue
        db.add(Specialty(id=uuid.uuid4(), slug=slug, name=name, category=category))
    db.flush()


def link_specialist(db: Session, specialist_id: uuid.UUID, slug: str) -> None:
    spec = db.scalar(select(Specialty).where(Specialty.slug == slug))
    if spec is None:
        raise ValueError(f"Specialty slug assente in DB: {slug!r}")
    exists = db.scalar(
        select(specialist_specialties.c.specialist_id).where(
            specialist_specialties.c.specialist_id == specialist_id,
            specialist_specialties.c.specialty_id == spec.id,
        )
    )
    if exists:
        return
    db.execute(insert(specialist_specialties).values(specialist_id=specialist_id, specialty_id=spec.id))


def combined_text(row: dict[str, str]) -> str:
    parts = [
        row.get("name") or "",
        row.get("address") or "",
        row.get("opening_hours") or "",
        row.get("google_types") or "",
    ]
    return " ".join(parts)


def resolve_specialty_slugs(blob: str) -> list[str]:
    t = blob.lower()
    out: list[str] = ["visite-generali"]
    if any(
        k in t
        for k in (
            "urgenza",
            "urgenze",
            "emergenza",
            "emergenze",
            "pronto soccorso",
            "prontosoccorso",
            "24 ore",
            "24h",
        )
    ):
        out.append("emergenze")
    if "domicilio" in t or "a domicilio" in t:
        out.append("domicilio")
    if "chirurgia" in t:
        out.append("chirurgia")
    seen: set[str] = set()
    uniq: list[str] = []
    for s in out:
        if s not in seen:
            seen.add(s)
            uniq.append(s)
    return uniq


def load_existing_emails(db: Session) -> set[str]:
    rows = db.execute(select(func.lower(Specialist.email))).all()
    return {r[0] for r in rows if r[0]}


def truncate(s: str, n: int) -> str:
    s = (s or "").strip()
    return s if len(s) <= n else s[: n - 1] + "…"


def process_row(
    row: dict[str, str],
    *,
    existing_emails: set[str],
    pending_emails: set[str],
) -> tuple[str | None, str | None]:
    """Ritorna (email, None) se inseribile; (None, reason) se skip."""
    name = (row.get("name") or "").strip()
    if not name:
        return None, "nome vuoto"

    business = (row.get("business_status") or "").strip()
    if business and business != "OPERATIONAL":
        return None, f"business_status={business!r}"

    prov = (row.get("province") or "").strip().upper()
    if not prov or prov not in IT_PROVINCE_CODES:
        return None, "provincia assente o non valida"

    city = norm_city(row.get("city") or "")
    if not city:
        return None, "città vuota"

    email_col = (row.get("email") or "").strip().lower()
    if email_col:
        email = email_col
        if email in existing_emails or email in pending_emails:
            return None, "email duplicata"
    else:
        sn = to_slug(name)
        sc = to_slug(city)
        base_local = f"{sn}_{sc}"
        email = f"{base_local}@noemail.local"
        # Se già in DB: stesso studio (slug+città), non creare suffissi _1 che duplicano l'anagrafica
        if email in existing_emails:
            return None, "email duplicata"
        n = 0
        while email in pending_emails:
            n += 1
            email = f"{base_local}_{n}@noemail.local"

    return email.lower(), None


def city_matches_filter(row_city_raw: str, filter_city: str) -> bool:
    """Confronto case-insensitive, trim (stesso comune anche se maiuscole diverse)."""
    a = (row_city_raw or "").strip().lower()
    b = (filter_city or "").strip().lower()
    return bool(a) and a == b


def import_csv(
    db: Session,
    path: Path,
    *,
    dry_run: bool,
    city_filter: str | None = None,
    offset_valid: int = 0,
    limit: int | None = None,
) -> dict[str, int]:
    ensure_extra_specialties(db)

    # Verifica slug richiesti (una query)
    required_slugs = {"visite-generali", "emergenze", "domicilio", "chirurgia"}
    valid_slugs: set[str] = {r[0] for r in db.execute(select(Specialty.slug)).all()}
    missing = required_slugs - valid_slugs
    if missing:
        raise SystemExit(
            f"Mancano specialty in DB: {sorted(missing)}. Esegui prima: python scripts/seed.py (o alembic upgrade)."
        )

    existing_emails = load_existing_emails(db)
    pending_emails: set[str] = set()

    stats: dict[str, int] = {
        "processed": 0,
        "inserted": 0,
        "skipped_duplicates": 0,
        "skipped_invalid": 0,
        "errors": 0,
    }
    dry_preview_insert: list[str] = []
    dry_preview_skip: list[str] = []
    valid_candidates_seen = 0
    batch_inserts = 0

    print(
        f"Opzioni: dry_run={dry_run} city={city_filter!r} offset_valid={offset_valid} limit={limit!r}"
    )

    # utf-8-sig: rimuove BOM se presente (altrimenti la prima colonna è "\ufeffname" e name risulta vuoto)
    with path.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)

        for row in reader:
            if limit is not None and stats["inserted"] >= limit:
                break

            stats["processed"] += 1
            email, skip_reason = process_row(
                row,
                existing_emails=existing_emails,
                pending_emails=pending_emails,
            )

            if skip_reason:
                if skip_reason == "email duplicata":
                    stats["skipped_duplicates"] += 1
                else:
                    stats["skipped_invalid"] += 1
                if dry_run and len(dry_preview_skip) < 10:
                    nm = truncate((row.get("name") or "").strip(), 80)
                    dry_preview_skip.append(f"{nm} | {skip_reason}")
                continue

            assert email is not None

            row_city_raw = (row.get("city") or "").strip()
            if city_filter and not city_matches_filter(row_city_raw, city_filter):
                stats["skipped_invalid"] += 1
                if dry_run and len(dry_preview_skip) < 10:
                    nm = truncate((row.get("name") or "").strip(), 80)
                    dry_preview_skip.append(
                        f"{nm} | filtro città: CSV={row_city_raw!r} atteso={city_filter!r}"
                    )
                continue

            valid_candidates_seen += 1
            if valid_candidates_seen <= offset_valid:
                continue

            name = truncate((row.get("name") or "").strip(), 255)
            prov = (row.get("province") or "").strip().upper()[:8]
            city = norm_city(row_city_raw)
            address = (row.get("address") or "").strip()
            cap = norm_cap(extract_cap_from_address(address) or "") or None
            phone_raw = (row.get("phone_primary") or row.get("phone") or "").strip()
            phone = phone_raw or None
            website_raw = (row.get("website") or "").strip()
            website_url = website_raw or None

            blob = combined_text(row)
            spec_slugs = resolve_specialty_slugs(blob)

            try:
                unknown = [s for s in spec_slugs if s not in valid_slugs]
                if unknown:
                    raise ValueError(f"slug non in DB: {unknown}")

                if dry_run:
                    pending_emails.add(email.lower())
                    existing_emails.add(email.lower())
                    stats["inserted"] += 1
                    line = (
                        f"full_name={name!r} | city={city!r} | email={email} | specialties={spec_slugs}"
                    )
                    if len(dry_preview_insert) < 10:
                        dry_preview_insert.append(line)
                else:
                    with db.begin_nested():
                        sp = Specialist(
                            id=uuid.uuid4(),
                            email=email.lower(),
                            full_name=name or "Senza nome",
                            city=city,
                            province=prov,
                            cap=cap,
                            street_address=address or None,
                            phone=phone,
                            website_url=website_url,
                            is_active=True,
                            species_tags=["cane", "gatto"],
                        )
                        db.add(sp)
                        db.flush()
                        for slug in spec_slugs:
                            link_specialist(db, sp.id, slug)
                    pending_emails.add(email.lower())
                    existing_emails.add(email.lower())
                    stats["inserted"] += 1
                    print(
                        f"[insert] full_name={name!r} | city={city!r} | email={email} | specialties={spec_slugs}"
                    )
                    batch_inserts += 1

                    if batch_inserts >= BATCH_SIZE:
                        db.commit()
                        batch_inserts = 0

            except Exception as e:  # noqa: BLE001
                stats["errors"] += 1
                print(f"ERR riga {stats['processed']}: {email}: {e}")

        if not dry_run and batch_inserts:
            db.commit()

    if dry_run:
        db.rollback()

    print("--- Riepilogo ---")
    print(f"processed: {stats['processed']}")
    print(f"inserted: {stats['inserted']}")
    print(f"skipped_duplicates: {stats['skipped_duplicates']}")
    print(f"skipped_invalid: {stats['skipped_invalid']}")
    print(f"errors: {stats['errors']}")

    if dry_run:
        print("\n--- Dry-run: prime 10 righe che verrebbero inserite ---")
        for line in dry_preview_insert:
            print(f"  {line}")
        print("--- Dry-run: prime 10 righe scartate (motivo) ---")
        for line in dry_preview_skip:
            print(f"  {line}")

    return stats


def main() -> int:
    ap = argparse.ArgumentParser(description="Import specialists da veterinari.csv (frontend)")
    ap.add_argument("--csv", type=Path, default=DEFAULT_CSV, help="Percorso veterinari.csv")
    ap.add_argument("--dry-run", action="store_true", help="Nessun INSERT; transazione annullata")
    ap.add_argument("--limit", type=int, default=None, metavar="N", help="Massimo N righe valide importate (dopo offset)")
    ap.add_argument(
        "--city",
        type=str,
        default=None,
        metavar="CITY_NAME",
        help="Solo righe CSV con questa città (confronto case-insensitive)",
    )
    ap.add_argument(
        "--offset",
        type=int,
        default=0,
        metavar="N",
        help="Salta le prime N righe valide (dopo filtri process_row e --city)",
    )
    args = ap.parse_args()

    if args.offset < 0:
        print("--offset deve essere >= 0", file=sys.stderr)
        return 1
    if args.limit is not None and args.limit < 0:
        print("--limit deve essere >= 0", file=sys.stderr)
        return 1

    if not args.csv.is_file():
        print(f"File non trovato: {args.csv}", file=sys.stderr)
        return 1

    db: Session = SessionLocal()
    try:
        import_csv(
            db,
            args.csv,
            dry_run=args.dry_run,
            city_filter=args.city,
            offset_valid=args.offset,
            limit=args.limit,
        )
    finally:
        db.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
