#!/usr/bin/env python3
"""
Import/aggiornamento dati veterinari da veterinari_italia_completo_enriched.csv → DB.

Match CSV→DB per full_name+city (normalizzati). Aggiorna campi mancanti, crea nuovi
specialist se non trovati.

Uso:
  python scripts/import_enriched_csv.py --csv /path/to/veterinari_italia_completo_enriched.csv --dry-run
  python scripts/import_enriched_csv.py --csv /path/to/veterinari_italia_completo_enriched.csv
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

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND) not in sys.path:
    sys.path.insert(0, str(_BACKEND))

from sqlalchemy import func, select, insert  # noqa: E402
from sqlalchemy.orm import Session  # noqa: E402

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialist, Specialty, specialist_specialties  # noqa: E402


# ---------------------------------------------------------------------------
# Normalizzazione
# ---------------------------------------------------------------------------

def norm(s: str) -> str:
    """Normalizza stringa per matching: lowercase, no accenti, no punteggiatura extra."""
    s = (s or "").strip().lower()
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[''`\.\,]", "", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def match_key(name: str, city: str) -> str:
    return f"{norm(name)}|{norm(city)}"


# ---------------------------------------------------------------------------
# Specialty resolution (copiato da import_italia_pg_wave.py)
# ---------------------------------------------------------------------------

SPECIALTY_KEYWORDS: dict[str, list[str]] = {
    "chirurgia": ["chirurg", "surgery"],
    "dermatologia": ["dermatolog", "pelle", "cute"],
    "cardiologia": ["cardiolog", "cuore"],
    "ortopedia": ["ortoped", "ossa", "frattur"],
    "oftalmologia": ["oftalm", "oculist", "occhi", "occhio"],
    "neurologia": ["neurolog", "cervell"],
    "oncologia": ["oncolog", "tumor"],
    "odontoiatria": ["odonto", "dent", "denti"],
    "emergenze": ["emergenz", "pronto soccorso", "h24", "24h", "24 ore", "urgenz"],
    "domicilio": ["domicilio", "a casa"],
    "ecografia": ["ecograf"],
    "radiologia": ["radiolog", "raggi"],
    "laboratorio-analisi": ["laborator", "analisi"],
    "animali-esotici": ["esotic", "rettil", "exotic"],
    "comportamento": ["comportament", "etolog"],
}


def resolve_specialty_slugs(text: str) -> list[str]:
    t = norm(text)
    found: list[str] = []
    for slug, keywords in SPECIALTY_KEYWORDS.items():
        if any(kw in t for kw in keywords):
            found.append(slug)
    return found


def link_specialist(db: Session, specialist_id: uuid.UUID, slug: str) -> None:
    spec_id = db.execute(
        select(Specialty.id).where(Specialty.slug == slug)
    ).scalar()
    if not spec_id:
        return
    exists = db.execute(
        select(specialist_specialties.c.specialist_id).where(
            specialist_specialties.c.specialist_id == specialist_id,
            specialist_specialties.c.specialty_id == spec_id,
        )
    ).first()
    if not exists:
        db.execute(
            insert(specialist_specialties).values(
                specialist_id=specialist_id, specialty_id=spec_id
            )
        )


# ---------------------------------------------------------------------------
# Provincia mapping (dal campo province_region del CSV che ha "Abruzzo", ecc.)
# Non serve: usiamo parse_location_from_url come nello script originale
# ---------------------------------------------------------------------------

IT_PROVINCE_CODES = frozenset(
    "AG AL AN AO AP AQ AR AT AV BA BG BI BL BN BO BR BS BT BZ CA CB CE CH CL CN CO "
    "CR CS CT CZ EN FC FE FG FI FM FR GE GO GR IM IS KR LC LE LI LO LT LU MB MC ME "
    "MI MN MO MS MT NA NO NU OR PA PC PD PE PG PI PN PO PR PT PU PV PZ RA RC RE RG "
    "RI RM RN RO SA SI SO SP SR SS SU SV TA TE TN TO TP TR TS TV UD VA VB VC VE VI "
    "VR VT VV".split()
)


def parse_province_from_url(url: str) -> str | None:
    """Estrae codice provincia dall'URL PagineGialle (es. .../scafa-pe/...)."""
    if not url:
        return None
    m = re.search(r"paginegialle\.it/([^/]+)/?", url, re.I)
    if not m:
        return None
    seg = m.group(1).lower()
    parts = seg.split("-")
    if len(parts) >= 2:
        prov = parts[-1].upper()
        if len(prov) == 2 and prov in IT_PROVINCE_CODES:
            return prov
    return None


def to_slug(s: str) -> str:
    s = norm(s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")[:120] or "sconosciuto"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(description="Import/update veterinari da CSV enriched")
    ap.add_argument("--csv", type=Path, required=True, help="Path al CSV enriched")
    ap.add_argument("--dry-run", action="store_true", help="Solo report, nessuna scrittura DB")
    ap.add_argument("--import-batch", default="enriched_2026_04", help="Batch per nuovi specialist")
    args = ap.parse_args()

    if not args.csv.is_file():
        print(f"CSV non trovato: {args.csv}", file=sys.stderr)
        return 1

    # --- Leggi CSV ---
    rows: list[dict[str, str]] = []
    with args.csv.open(encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            rows.append({k: (v or "").strip() for k, v in row.items()})
    print(f"Righe CSV: {len(rows)}")

    # --- Dedup CSV per URL ---
    seen_url: dict[str, dict[str, str]] = {}
    for row in rows:
        u = (row.get("url") or "").strip().lower().rstrip("/")
        if u:
            if u not in seen_url:
                seen_url[u] = row
        else:
            # Rows without URL: use name+city as key
            k = match_key(row.get("name", ""), row.get("city", ""))
            if k not in seen_url:
                seen_url[k] = row
    deduped = list(seen_url.values())
    print(f"Dopo dedup: {len(deduped)}")

    # --- Carica DB specialists ---
    db = SessionLocal()
    try:
        all_specs = db.execute(
            select(
                Specialist.id,
                Specialist.full_name,
                Specialist.city,
                Specialist.phone,
                Specialist.phone_mobile,
                Specialist.phone_fixed,
                Specialist.contact_email,
                Specialist.street_address,
                Specialist.cap,
                Specialist.opening_hours,
                Specialist.business_description,
                Specialist.website_url,
            )
        ).fetchall()

        # Build match index: norm(name)|norm(city) → list[specialist_id]
        db_index: dict[str, list[uuid.UUID]] = {}
        for sp in all_specs:
            k = match_key(sp.full_name or "", sp.city or "")
            db_index.setdefault(k, []).append(sp.id)

        print(f"Specialist nel DB: {len(all_specs)}")
        print(f"Chiavi univoche DB (name+city): {len(db_index)}")

        # --- Stats ---
        matched = 0
        updated = 0
        created = 0
        skipped_no_name = 0
        skipped_no_city = 0
        skipped_email_dup = 0
        fields_updated: dict[str, int] = {}

        valid_slugs = {r[0] for r in db.execute(select(Specialty.slug)).all()}

        # Preload existing emails for dedup on insert
        existing_emails = {
            r[0] for r in db.execute(select(func.lower(Specialist.email))).all() if r[0]
        }

        batch_count = 0

        for row in deduped:
            name = (row.get("name") or "").strip()
            city = (row.get("city") or "").strip()

            if not name:
                skipped_no_name += 1
                continue
            if not city:
                skipped_no_city += 1
                continue

            k = match_key(name, city)
            csv_phone = (row.get("phone") or "").strip()[:64]
            csv_mobile = (row.get("phone_mobile") or "").strip()[:64]
            csv_landline = (row.get("phone_landline") or "").strip()[:64]
            csv_email = (row.get("email") or "").strip()[:320]
            csv_website = (row.get("website") or "").strip()[:2048]
            csv_address = (row.get("street_address") or "").strip()[:512]
            csv_cap = (row.get("postal_code") or "").strip()[:16]
            csv_hours = (row.get("opening_hours") or "").strip()
            csv_desc = (row.get("description") or "").strip()

            if k in db_index:
                # --- UPDATE existing specialist(s) ---
                matched += 1
                sp_ids = db_index[k]

                for sp_id in sp_ids:
                    sp = db.get(Specialist, sp_id)
                    if not sp:
                        continue

                    changed = []

                    def set_if_empty(field: str, value: str) -> None:
                        if not value:
                            return
                        current = getattr(sp, field, None)
                        if current and str(current).strip():
                            # Skip @noemail.local for contact_email
                            if field == "contact_email" and "@noemail.local" in str(current):
                                pass  # Allow overwrite
                            else:
                                return
                        setattr(sp, field, value)
                        changed.append(field)

                    set_if_empty("phone", csv_phone)
                    set_if_empty("phone_mobile", csv_mobile)
                    set_if_empty("phone_fixed", csv_landline)
                    set_if_empty("contact_email", csv_email)
                    set_if_empty("website_url", csv_website)
                    set_if_empty("street_address", csv_address)
                    set_if_empty("cap", csv_cap)
                    set_if_empty("opening_hours", csv_hours)
                    set_if_empty("business_description", csv_desc)

                    if changed:
                        updated += 1
                        for f in changed:
                            fields_updated[f] = fields_updated.get(f, 0) + 1
                        if not args.dry_run:
                            batch_count += 1
                            if batch_count >= 200:
                                db.commit()
                                batch_count = 0
            else:
                # --- CREATE new specialist ---
                if args.dry_run:
                    created += 1
                    continue

                province = parse_province_from_url(row.get("url", ""))
                if not province:
                    # Try to extract from province_region or address_full
                    province = ""

                url_str = (row.get("url") or "").strip()
                url_hash = hashlib.md5(url_str.encode()).hexdigest()[:16] if url_str else hashlib.md5(f"{name}{city}".encode()).hexdigest()[:16]
                placeholder_email = f"v{url_hash}@noemail.local"

                # Avoid duplicate email collision
                if placeholder_email.lower() in existing_emails:
                    # Already exists with different name/city — skip
                    skipped_email_dup += 1
                    continue

                sp = Specialist(
                    id=uuid.uuid4(),
                    email=placeholder_email,
                    full_name=name[:255],
                    city=city,
                    province=province,
                    cap=csv_cap or None,
                    street_address=csv_address or None,
                    phone=csv_phone or None,
                    phone_mobile=csv_mobile or None,
                    phone_fixed=csv_landline or None,
                    contact_email=csv_email or None,
                    website_url=csv_website or (url_str if "paginegialle" in url_str.lower() else None),
                    opening_hours=csv_hours or None,
                    business_description=csv_desc or None,
                    is_active=True,
                    species_tags=["cane", "gatto"],
                    import_batch=args.import_batch,
                )
                db.add(sp)
                db.flush()

                # Link specialties from name/description
                blob = f"{name} {csv_desc}"
                spec_slugs = [s for s in resolve_specialty_slugs(blob) if s in valid_slugs]
                if not spec_slugs:
                    spec_slugs = ["visite-generali"]
                for slug in spec_slugs:
                    link_specialist(db, sp.id, slug)

                existing_emails.add(placeholder_email.lower())
                # Add to index to prevent duplicates within CSV
                db_index.setdefault(k, []).append(sp.id)
                created += 1
                batch_count += 1
                if batch_count >= 200:
                    db.commit()
                    batch_count = 0

        if not args.dry_run and batch_count > 0:
            db.commit()

        # --- Report ---
        print(f"\n{'='*50}")
        print(f"REPORT {'(DRY RUN) ' if args.dry_run else ''}")
        print(f"{'='*50}")
        print(f"CSV righe processate: {len(deduped)}")
        print(f"Matched (name+city): {matched}")
        print(f"  → Aggiornati (almeno 1 campo): {updated}")
        print(f"Creati (nuovi specialist): {created}")
        print(f"Skipped (no name): {skipped_no_name}")
        print(f"Skipped (no city): {skipped_no_city}")
        print(f"Skipped (email dup): {skipped_email_dup}")
        if fields_updated:
            print(f"\nCampi aggiornati:")
            for f, cnt in sorted(fields_updated.items(), key=lambda x: -x[1]):
                print(f"  {f}: {cnt}")

    finally:
        db.close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
