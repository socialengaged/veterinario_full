#!/usr/bin/env python3
"""
Import ondata PagineGialle (veterinari_italia_completo_dedup.csv) → DB specialists + CSV frontend.

- Dedup righe per `url` (normalizzata).
- `import_batch` su DB (non esposto in API pubbliche).
- Genera `veterinari_italia_wave.csv` (stesso schema di veterinari.csv) con source=italia_pg_2026,
  contatti vuoti dove mancano dati; website = URL PG.
- Collega specialty come import_from_frontend_dataset.

Esempi (da cartella backend):
  python scripts/import_italia_pg_wave.py --dry-run
  python scripts/import_italia_pg_wave.py
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import re
import sys
import unicodedata
import uuid
from pathlib import Path
from typing import Any

from sqlalchemy import func, insert, select
from sqlalchemy.orm import Session

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND) not in sys.path:
    sys.path.insert(0, str(_BACKEND))

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialty, Specialist, specialist_specialties  # noqa: E402

# Copiato da import_from_frontend_dataset per coerenza
EXTRA_SPECIALTIES: list[tuple[str, str, str]] = [
    ("domicilio", "Veterinario a domicilio", "cura"),
]

IT_PROVINCE_CODES = frozenset(
    """\
AG AL AN AO AP AQ AR AT AV BA BG BI BL BN BO BR BS BT BZ CA CB CE CH CL CN CO CR CS CT CZ EN FC FE FG FI FM FR GE GO GR IM IS KR LC LE LI LO LT LU MB MC ME MI MN MO MS MT NA NO NU OR PA PC PD PE PG PI PN PO PR PT PU PV PZ RA RC RE RG RI RM RN RO SA SI SO SP SR SS SU SV TA TE TN TO TP TR TS TV UD VA VB VC VE VI VR VT VV""".split()
)


def to_slug(s: str) -> str:
    s = (s or "").strip().lower()
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[''`]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return (s[:120] if s else "sconosciuto")


def norm_city(raw: str) -> str:
    t = (raw or "").strip()
    return t.title() if t else ""


def parse_location_from_url(url: str) -> tuple[str | None, str | None]:
    if not url:
        return None, None
    m = re.search(r"paginegialle\.it/([^/]+)/?", url, re.I)
    if not m:
        return None, None
    seg = m.group(1).lower()
    parts = seg.split("-")
    if len(parts) < 2:
        return None, None
    prov = parts[-1]
    if len(prov) == 2 and prov.isalpha():
        city_slug = "-".join(parts[:-1])
        city = city_slug.replace("-", " ").strip()
        if city:
            return city.title(), prov.upper()
    return None, None


def norm_url(u: str) -> str:
    u = (u or "").strip().rstrip("/")
    return u.lower()


def ensure_extra_specialties(db: Session) -> None:
    for slug, name, category in EXTRA_SPECIALTIES:
        exists = db.scalar(select(Specialty.id).where(Specialty.slug == slug).limit(1))
        if exists:
            continue
        db.add(Specialty(id=uuid.uuid4(), slug=slug, name=name, category=category))
    db.flush()


def resolve_specialty_slugs(blob: str) -> list[str]:
    t = (blob or "").lower()
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


def link_specialist(db: Session, specialist_id: uuid.UUID, slug: str) -> None:
    spec = db.scalar(select(Specialty).where(Specialty.slug == slug))
    if spec is None:
        return
    exists = db.scalar(
        select(specialist_specialties.c.specialist_id).where(
            specialist_specialties.c.specialist_id == specialist_id,
            specialist_specialties.c.specialty_id == spec.id,
        )
    )
    if exists:
        return
    db.execute(insert(specialist_specialties).values(specialist_id=specialist_id, specialty_id=spec.id))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--italia-csv",
        type=Path,
        default=_BACKEND.parent / "veterinari_italia_completo_dedup.csv",
        help="CSV dedup PagineGialle",
    )
    ap.add_argument(
        "--wave-csv-out",
        type=Path,
        default=_BACKEND.parent / "veterinari_frontend" / "src" / "data" / "veterinari_italia_wave.csv",
        help="Output CSV onda (schema veterinari.csv)",
    )
    ap.add_argument("--import-batch", default="italia_pg_2026_04", help="Valore specialists.import_batch")
    ap.add_argument("--source-tag", default="italia_pg_2026", help="Colonna source nel CSV wave (frontend)")
    ap.add_argument("--dry-run", action="store_true", help="Nessuna scrittura DB né file")
    ap.add_argument(
        "--csv-only",
        action="store_true",
        help="Solo generazione veterinari_italia_wave.csv (nessun insert DB)",
    )
    args = ap.parse_args()

    if not args.italia_csv.is_file():
        print(f"Manca CSV: {args.italia_csv}", file=sys.stderr)
        return 1

    rows_in: list[dict[str, str]] = []
    with args.italia_csv.open(encoding="utf-8-sig", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            rows_in.append({k: (v or "").strip() for k, v in row.items()})

    seen_url: dict[str, dict[str, str]] = {}
    for row in rows_in:
        u = norm_url(row.get("url") or "")
        if not u:
            continue
        if u not in seen_url:
            seen_url[u] = row

    deduped = list(seen_url.values())
    print(f"Righe CSV input: {len(rows_in)} | dopo dedup URL: {len(deduped)}")

    # Prepara righe valide (geo + slug)
    prepared: list[dict[str, Any]] = []
    used_slugs: set[str] = set()
    for row in deduped:
        name = (row.get("name") or "").strip()
        url = (row.get("url") or "").strip()
        if not name or not url:
            continue
        city, prov = parse_location_from_url(url)
        if not city or not prov or prov not in IT_PROVINCE_CODES:
            continue
        region_name = (row.get("region") or "").strip() or ""
        base_slug = to_slug(f"{name} {city}")
        slug = f"{base_slug[:88]}-{hashlib.md5(url.encode()).hexdigest()[:12]}"
        if slug in used_slugs:
            slug = f"{slug}-{hashlib.md5((url + '2').encode()).hexdigest()[:8]}"
        used_slugs.add(slug)
        url_hash = hashlib.md5(url.encode()).hexdigest()[:16]
        email = f"v{url_hash}@noemail.local".lower()
        prepared.append(
            {
                "name": name[:255],
                "region": region_name,
                "province": prov,
                "city": city,
                "address": "",
                "phone": "",
                "website": url,
                "lat": "",
                "lon": "",
                "opening_hours": "",
                "google_rating": "",
                "google_reviews": "",
                "business_status": "OPERATIONAL",
                "google_types": "",
                "source": args.source_tag,
                "slug": slug,
                "email": email,
            }
        )

    print(f"Righe preparate (geo OK): {len(prepared)}")

    if args.dry_run:
        print("Dry-run: stop prima di scrivere file/DB.")
        return 0

    # --- Scrivi CSV wave (file sempre generato se non dry-run) ---
    args.wave_csv_out.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "name",
        "region",
        "province",
        "city",
        "address",
        "phone_primary",
        "website",
        "lat",
        "lon",
        "opening_hours",
        "google_rating",
        "google_reviews_count",
        "business_status",
        "google_types",
        "source",
        "profile_slug",
    ]
    with args.wave_csv_out.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for p in prepared:
            w.writerow(
                {
                    "name": p["name"],
                    "region": p["region"],
                    "province": p["province"],
                    "city": p["city"],
                    "address": p["address"],
                    "phone_primary": p["phone"],
                    "website": p["website"],
                    "lat": p["lat"],
                    "lon": p["lon"],
                    "opening_hours": p["opening_hours"],
                    "google_rating": p["google_rating"],
                    "google_reviews_count": p["google_reviews"],
                    "business_status": p["business_status"],
                    "google_types": p["google_types"],
                    "source": p["source"],
                    "profile_slug": p["slug"],
                }
            )
    print(f"Scritto: {args.wave_csv_out}")

    if args.csv_only:
        print("Opzione --csv-only: nessun insert DB.")
        return 0

    # --- DB ---
    db = SessionLocal()
    try:
        ensure_extra_specialties(db)
        valid_slugs = {r[0] for r in db.execute(select(Specialty.slug)).all()}
        required = {"visite-generali", "emergenze", "domicilio", "chirurgia"}
        if not required.issubset(valid_slugs):
            print("Mancano specialty in DB. Esegui seed/alembic.", file=sys.stderr)
            return 1

        existing_emails = {r[0] for r in db.execute(select(func.lower(Specialist.email))).all() if r[0]}
        n_ins = 0
        batch = 0
        for p in prepared:
            el = p["email"].lower()
            if el in existing_emails:
                continue
            blob = f"{p['name']} {p['website']}"
            spec_slugs = [x for x in resolve_specialty_slugs(blob) if x in valid_slugs]
            if not spec_slugs:
                spec_slugs = ["visite-generali"]
            sp = Specialist(
                id=uuid.uuid4(),
                email=el,
                full_name=p["name"],
                city=p["city"],
                province=p["province"],
                cap=None,
                street_address=None,
                phone=None,
                website_url=p["website"],
                is_active=True,
                species_tags=["cane", "gatto"],
                import_batch=args.import_batch,
            )
            db.add(sp)
            db.flush()
            for slug in spec_slugs:
                if slug in valid_slugs:
                    link_specialist(db, sp.id, slug)
            existing_emails.add(el)
            n_ins += 1
            batch += 1
            if batch >= 200:
                db.commit()
                batch = 0
        if batch:
            db.commit()
        print(f"Inseriti nuovi specialists: {n_ins}")
    finally:
        db.close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
