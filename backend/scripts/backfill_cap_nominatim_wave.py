#!/usr/bin/env python3
"""
Secondo passaggio CAP per l'ondata `import_batch`: solo specialist con CAP ancora vuoto.

Fonte: **OpenStreetMap Nominatim** (geocoding pubblico). Query: «città, provincia, Italia»;
estrazione `address.postcode` (CAP italiano a 5 cifre). Dedup per (city, province) per
rispettare il rate limit (~1 richiesta/s).

Policy Nominatim: User-Agent identificativo; non per bulk ad alta frequenza in produzione
continua — uso batch occasionale post-import.

  python scripts/backfill_cap_nominatim_wave.py --dry-run
  python scripts/backfill_cap_nominatim_wave.py
  python scripts/backfill_cap_nominatim_wave.py --limit-unique-pairs 20   # test

Altre info mancanti (telefono, indirizzo, orari): vedi `DATABASE.md` (sezione *Dati mancanti*).
"""
from __future__ import annotations

import argparse
import re
import sys
import time
from pathlib import Path
from typing import Any, Optional

import httpx

_backend = Path(__file__).resolve().parent.parent
if str(_backend) not in sys.path:
    sys.path.insert(0, str(_backend))

from sqlalchemy import and_, func, or_, select  # noqa: E402

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialist  # noqa: E402

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
USER_AGENT = (
    "VeterinarioVicino/1.0 (cap-backfill; https://veterinariovicino.it; "
    "batch specialist import)"
)
CAP_IT_RE = re.compile(r"^\d{5}$")
POSTCODE_FROM_DISPLAY = re.compile(r"\b(\d{5})\b")


def extract_postcode(item: dict[str, Any]) -> Optional[str]:
    addr = item.get("address") or {}
    pc = (addr.get("postcode") or "").strip()
    if pc and CAP_IT_RE.match(pc):
        return pc
    disp = item.get("display_name") or ""
    m = POSTCODE_FROM_DISPLAY.search(disp)
    if m and CAP_IT_RE.match(m.group(1)):
        return m.group(1)
    return None


def nominatim_cap(city: str, province: str, *, client: httpx.Client) -> tuple[Optional[str], str]:
    """Ritorna (cap o None, motivo)."""
    city = (city or "").strip()
    province = (province or "").strip().upper()
    if not city or not province:
        return None, "empty_city_or_province"
    if len(city) > 180:
        return None, "city_too_long"
    q = f"{city}, {province}, Italy"
    try:
        r = client.get(
            NOMINATIM_URL,
            params={
                "q": q,
                "format": "jsonv2",
                "addressdetails": "1",
                "limit": "3",
                "countrycodes": "it",
            },
            timeout=30.0,
        )
        r.raise_for_status()
        data = r.json()
    except Exception as e:
        return None, f"http_error:{e!s}"[:80]

    if not isinstance(data, list) or not data:
        return None, "no_results"

    for item in data[:3]:
        pc = extract_postcode(item)
        if pc:
            return pc, "ok"
    return None, "no_postcode_in_results"


def main() -> int:
    ap = argparse.ArgumentParser(description="CAP da Nominatim per ondata import_batch (CAP vuoti).")
    ap.add_argument("--import-batch", default="italia_pg_2026_04")
    ap.add_argument("--dry-run", action="store_true", help="Esegue le query OSM ma non scrive sul DB")
    ap.add_argument(
        "--no-fetch",
        action="store_true",
        help="Solo conteggi (nessuna chiamata HTTP). Utile per stimare tempo/coppie.",
    )
    ap.add_argument("--min-delay", type=float, default=1.1, help="Secondi tra richieste Nominatim (default 1.1)")
    ap.add_argument(
        "--limit-unique-pairs",
        type=int,
        default=0,
        help="Solo prime N coppie (city,province) uniche (0 = tutte)",
    )
    args = ap.parse_args()

    db = SessionLocal()
    try:
        empty_cap = or_(Specialist.cap.is_(None), func.trim(Specialist.cap) == "")
        q = (
            select(Specialist)
            .where(
                and_(
                    Specialist.import_batch == args.import_batch,
                    empty_cap,
                )
            )
            .order_by(Specialist.city, Specialist.province, Specialist.id)
        )
        rows = db.execute(q).scalars().all()
        print(f"Specialists con CAP vuoto (batch={args.import_batch}): {len(rows)}")
        if not rows:
            return 0

        # Raggruppa per (city, province) → lista id
        by_pair: dict[tuple[str, str], list] = {}
        for sp in rows:
            key = ((sp.city or "").strip(), (sp.province or "").strip().upper())
            by_pair.setdefault(key, []).append(sp.id)

        pairs = sorted(by_pair.keys(), key=lambda x: (x[0].lower(), x[1]))
        if args.limit_unique_pairs > 0:
            pairs = pairs[: args.limit_unique_pairs]
        print(f"Coppie uniche (city, province) da risolvere: {len(pairs)} (stima tempo ~{len(pairs) * args.min_delay / 60:.1f} min)")

        cap_for_pair: dict[tuple[str, str], tuple[Optional[str], str]] = {}

        if args.no_fetch:
            print("--no-fetch: uscita senza chiamate HTTP.")
            return 0

        headers = {"User-Agent": USER_AGENT}

        with httpx.Client(headers=headers, follow_redirects=True) as client:
            for i, (city, prov) in enumerate(pairs):
                cap, reason = nominatim_cap(city, prov, client=client)
                cap_for_pair[(city, prov)] = (cap, reason)
                if (i + 1) % 25 == 0 or i == 0:
                    print(f"  [{i+1}/{len(pairs)}] {city!r} ({prov}) -> {cap or '—'} ({reason})")
                if i < len(pairs) - 1:
                    time.sleep(args.min_delay)

        resolved = sum(1 for c, r in cap_for_pair.values() if c)
        print(f"Risolti: {resolved}/{len(pairs)} coppie con CAP")

        id_updates: list[tuple[Any, str]] = []
        for (city, prov), cap_reason in cap_for_pair.items():
            cap = cap_reason[0]
            if not cap:
                continue
            for sp_id in by_pair[(city, prov)]:
                id_updates.append((sp_id, cap))

        print(f"Righe specialist da aggiornare: {len(id_updates)}")

        if args.dry_run:
            print("Dry-run: nessun commit.")
            return 0

        n = 0
        for sp_id, cap_val in id_updates:
            sp = db.get(Specialist, sp_id)
            if sp is None:
                continue
            still = sp.cap is None or (isinstance(sp.cap, str) and not sp.cap.strip())
            if not still:
                continue
            sp.cap = cap_val[:16]
            n += 1
        db.commit()
        print(f"Commit OK. Righe aggiornate: {n}")
    finally:
        db.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
