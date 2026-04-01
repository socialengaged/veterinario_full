#!/usr/bin/env python3
"""
Backfill specialists.cap solo per l'ondata import (import_batch), senza toccare altri record.

Fonte CAP: `veterinari_frontend/src/data/comuni_italiani_full.csv` (nome + provincia_sigla → cap).
Matching: chiave normalizzata (accenti, case); suffissi frazione (lido/scalo/stazione); fuzzy
stesso provincia (difflib, cutoff configurabile) per varianti tipo apostrofi PG vs ISTAT.

Esempi (da cartella backend, .env → DB):
  python scripts/backfill_cap_italia_pg_wave.py --dry-run
  python scripts/backfill_cap_italia_pg_wave.py
"""
from __future__ import annotations

import argparse
import csv
import re
import sys
import unicodedata
from pathlib import Path
from difflib import get_close_matches
from typing import Optional

_backend = Path(__file__).resolve().parent.parent
if str(_backend) not in sys.path:
    sys.path.insert(0, str(_backend))

from sqlalchemy import and_, func, or_, select  # noqa: E402

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialist  # noqa: E402

_REPO_ROOT = Path(__file__).resolve().parent.parent.parent
DEFAULT_COMUNI_CSV = _REPO_ROOT / "veterinari_frontend" / "src" / "data" / "comuni_italiani_full.csv"


def norm_city(s: str) -> str:
    s = (s or "").strip()
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.lower()
    s = re.sub(r"\s+", " ", s)
    return s


def load_comuni_cap_map(csv_path: Path) -> tuple[dict[tuple[str, str], str], dict[str, list[str]]]:
    """(norm_nome, provincia) -> cap, e provincia -> lista nomi normalizzati per fuzzy."""
    cap_by_key: dict[tuple[str, str], str] = {}
    by_prov: dict[str, list[str]] = {}
    with csv_path.open(encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            nome = (row.get("nome") or "").strip()
            prov = (row.get("provincia_sigla") or "").strip().upper()
            cap = (row.get("cap") or "").strip()
            if not nome or not prov or not cap:
                continue
            n = norm_city(nome)
            cap_by_key[(n, prov)] = cap
            by_prov.setdefault(prov, []).append(n)
    return cap_by_key, by_prov


def resolve_cap(
    city: str,
    province: str,
    *,
    cap_by_key: dict[tuple[str, str], str],
    by_prov: dict[str, list[str]],
    fuzzy_cutoff: float,
) -> tuple[Optional[str], str]:
    prov = (province or "").strip().upper()
    if not prov:
        return None, "no_province"
    k = (norm_city(city), prov)
    if k in cap_by_key:
        return cap_by_key[k], "exact"
    names = by_prov.get(prov, [])
    nc = norm_city(city)
    for suf in (" lido", " scalo", " stazione"):
        if nc.endswith(suf):
            alt = nc[: -len(suf)].strip()
            if (alt, prov) in cap_by_key:
                return cap_by_key[(alt, prov)], "strip"
    m = get_close_matches(nc, names, n=1, cutoff=fuzzy_cutoff)
    if m:
        return cap_by_key[(m[0], prov)], "fuzzy"
    return None, "none"


def main() -> int:
    ap = argparse.ArgumentParser(description="Backfill CAP onda Italia PG (solo import_batch).")
    ap.add_argument(
        "--comuni-csv",
        type=Path,
        default=DEFAULT_COMUNI_CSV,
        help="CSV comuni con colonne nome, provincia_sigla, cap",
    )
    ap.add_argument("--import-batch", default="italia_pg_2026_04", help="Filtra specialists.import_batch")
    ap.add_argument("--dry-run", action="store_true", help="Solo statistiche, nessun UPDATE")
    ap.add_argument("--fuzzy-cutoff", type=float, default=0.88, help="Soglia fuzzy (0–1), default 0.88")
    args = ap.parse_args()

    if not args.comuni_csv.is_file():
        print(f"Manca CSV comuni: {args.comuni_csv}", file=sys.stderr)
        return 1

    cap_by_key, by_prov = load_comuni_cap_map(args.comuni_csv)
    print(f"Comuni caricati: {len(cap_by_key)} chiavi")

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
            .order_by(Specialist.id)
        )
        rows = db.execute(q).scalars().all()
        print(f"Specialists da aggiornare (batch={args.import_batch}, cap vuoto): {len(rows)}")

        stats: dict[str, int] = {}
        updates: list[tuple[object, str, str]] = []

        for sp in rows:
            cap, how = resolve_cap(
                sp.city or "",
                sp.province or "",
                cap_by_key=cap_by_key,
                by_prov=by_prov,
                fuzzy_cutoff=args.fuzzy_cutoff,
            )
            stats[how] = stats.get(how, 0) + 1
            if cap:
                updates.append((sp.id, cap, how))

        print(
            "Risoluzione CAP: "
            + ", ".join(f"{k}={v}" for k, v in sorted(stats.items()) if v)
        )
        print(f"Da scrivere: {len(updates)}")

        if args.dry_run:
            print("Dry-run: nessun commit.")
            return 0

        n = 0
        for sp_id, cap_val, _how in updates:
            sp = db.get(Specialist, sp_id)
            if sp is None:
                continue
            still_empty = sp.cap is None or (isinstance(sp.cap, str) and not sp.cap.strip())
            if not still_empty:
                continue
            sp.cap = cap_val[:16] if len(cap_val) > 16 else cap_val
            n += 1
        db.commit()
        print(f"Commit OK. Righe aggiornate: {n}")
    finally:
        db.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
