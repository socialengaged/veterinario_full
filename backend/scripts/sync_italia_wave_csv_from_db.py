#!/usr/bin/env python3
"""
Sincronizza `veterinari_italia_wave.csv` con i dati attuali della tabella `specialists` (ondata PG).

Allinea per `website_url` (normalizzato come URL PG). Aggiorna: phone_primary, address, website,
opening_hours (e lascia invariati name, region, province, city, slug, source, ecc.).

Uso (da cartella backend, .env → DB produzione o locale):
  python scripts/sync_italia_wave_csv_from_db.py --dry-run
  python scripts/sync_italia_wave_csv_from_db.py

Dopo: `npm run build` in `veterinari_frontend/` e deploy `dist/` su OVH.
"""
from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

_backend = Path(__file__).resolve().parent.parent
if str(_backend) not in sys.path:
    sys.path.insert(0, str(_backend))

from sqlalchemy import select  # noqa: E402

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialist  # noqa: E402
from app.services.admin_match_payload import specialist_phone_combined  # noqa: E402

_REPO = _backend.parent
DEFAULT_WAVE = _REPO / "veterinari_frontend" / "src" / "data" / "veterinari_italia_wave.csv"


def norm_url(u: str) -> str:
    return (u or "").strip().rstrip("/").lower()


def format_address(sp: Specialist) -> str:
    parts: list[str] = []
    if sp.street_address and str(sp.street_address).strip():
        parts.append(str(sp.street_address).strip())
    cap = (sp.cap or "").strip()
    city = (sp.city or "").strip()
    if cap and city:
        parts.append(f"{cap} {city}")
    elif cap:
        parts.append(cap)
    elif city:
        parts.append(city)
    return ", ".join(parts) if parts else ""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--wave-csv", type=Path, default=DEFAULT_WAVE)
    ap.add_argument("--import-batch", default="italia_pg_2026_04")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if not args.wave_csv.is_file():
        print(f"File non trovato: {args.wave_csv}", file=sys.stderr)
        return 1

    db = SessionLocal()
    try:
        rows = db.execute(
            select(Specialist).where(Specialist.import_batch == args.import_batch)
        ).scalars().all()
        by_url: dict[str, Specialist] = {}
        for sp in rows:
            u = norm_url(sp.website_url or "")
            if u:
                by_url[u] = sp
        print(f"Specialists in DB (batch={args.import_batch}): {len(rows)} | indice URL: {len(by_url)}")
    finally:
        db.close()

    with args.wave_csv.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        if not fieldnames:
            print("CSV senza header", file=sys.stderr)
            return 1
        data_rows = list(reader)

    updated = 0
    unmatched = 0
    out_rows: list[dict[str, str]] = []
    for row in data_rows:
        w = norm_url(row.get("website") or "")
        sp = by_url.get(w)
        if not sp:
            unmatched += 1
            out_rows.append(row)
            continue
        phone = specialist_phone_combined(sp)
        addr = format_address(sp)
        web = (sp.website_url or "").strip()
        oh = (getattr(sp, "opening_hours", None) or "").strip() if getattr(sp, "opening_hours", None) else ""

        new_row = dict(row)
        if phone:
            new_row["phone_primary"] = phone
        if addr:
            new_row["address"] = addr
        if web:
            new_row["website"] = web
        if oh:
            new_row["opening_hours"] = oh

        if new_row != row:
            updated += 1
        out_rows.append(new_row)

    print(f"Righe CSV: {len(data_rows)} | aggiornate rispetto a prima: {updated} | senza match DB: {unmatched}")

    if args.dry_run:
        print("Dry-run: file non scritto.")
        return 0

    with args.wave_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        for r in out_rows:
            w.writerow({k: r.get(k, "") for k in fieldnames})
    print(f"Scritto: {args.wave_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
