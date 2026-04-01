#!/usr/bin/env python3
"""
Confronto read-only: veterinari_italia_completo_dedup.csv vs tabella specialists (DB).

Il CSV Italia ha colonne: name, url, source, ... (NO address/city/province come veterinari.csv).
La posizione si ricava dall'URL paginegialle quando possibile (segmento comune-XX).

Match "forte": nome normalizzato + città + provincia (da URL o solo DB city/prov se URL non parsabile).
Match su indirizzo stradale: il CSV non ha street → si confronta solo street_address DB se nome+città coincidono (opzionale).

Uso (dalla cartella backend, con DATABASE_URL in .env):
  python scripts/compare_italia_csv_to_db.py --csv ../../veterinari_italia_completo_dedup.csv
"""
from __future__ import annotations

import argparse
import csv
import re
import sys
import unicodedata
from pathlib import Path

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND) not in sys.path:
    sys.path.insert(0, str(_BACKEND))

from sqlalchemy import select  # noqa: E402
from sqlalchemy.orm import Session  # noqa: E402

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialist  # noqa: E402


def norm_text(s: str | None) -> str:
    if not s:
        return ""
    t = unicodedata.normalize("NFD", s.strip().lower())
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return " ".join(t.split())


def parse_location_from_url(url: str) -> tuple[str | None, str | None]:
    """
    Estrae (city_guess, province_2letter) dal primo segmento path su paginegialle.it
    Formati tipici: caramanico-terme-pe, scafa-pe, chieti-ch
    """
    if not url:
        return None, None
    m = re.search(r"paginegialle\.it/([^/]+)/?", url, re.I)
    if not m:
        return None, None
    seg = m.group(1).lower()
    # esclude segmenti non-località
    if seg in ("www", "ricerca", "mappa") or seg.startswith("utenti"):
        return None, None
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


def load_specialists(db: Session) -> list[Specialist]:
    return list(db.scalars(select(Specialist)).all())


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--csv",
        type=Path,
        required=True,
        help="Path a veterinari_italia_completo_dedup.csv",
    )
    args = ap.parse_args()
    if not args.csv.is_file():
        print(f"File non trovato: {args.csv}", file=sys.stderr)
        return 1

    rows: list[dict[str, str]] = []
    with args.csv.open(encoding="utf-8-sig", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            rows.append({k: (v or "").strip() for k, v in row.items()})

    db = SessionLocal()
    try:
        sps = load_specialists(db)
    finally:
        db.close()

    # Indici per lookup
    by_name_city_prov: dict[tuple[str, str, str], list[str]] = {}
    for sp in sps:
        nk = norm_text(sp.full_name)
        ck = norm_text(sp.city)
        pk = (sp.province or "").strip().upper()[:8]
        key = (nk, ck, pk)
        by_name_city_prov.setdefault(key, []).append(str(sp.id))

    # anche nome+prov (città varianti)
    by_name_prov: dict[tuple[str, str], list[str]] = {}
    for sp in sps:
        nk = norm_text(sp.full_name)
        pk = (sp.province or "").strip().upper()[:8]
        by_name_prov.setdefault((nk, pk), []).append(str(sp.id))

    by_name_only: dict[str, list[str]] = {}
    for sp in sps:
        nk = norm_text(sp.full_name)
        by_name_only.setdefault(nk, []).append(str(sp.id))

    matched_sp_ids: set[str] = set()
    strong = 0
    weak_name_prov_only = 0
    name_only_unique = 0
    no_loc_in_url = 0
    csv_unmatched = 0

    for i, row in enumerate(rows):
        name = row.get("name") or ""
        url = row.get("url") or ""
        nn = norm_text(name)
        city_u, prov_u = parse_location_from_url(url)

        if not city_u or not prov_u:
            no_loc_in_url += 1

        found = False
        if city_u and prov_u:
            ck = norm_text(city_u)
            pk = prov_u
            key = (nn, ck, pk)
            if key in by_name_city_prov:
                for sid in by_name_city_prov[key]:
                    matched_sp_ids.add(sid)
                strong += 1
                found = True
            else:
                k2 = (nn, pk)
                if k2 in by_name_prov and len(by_name_prov[k2]) == 1:
                    matched_sp_ids.add(by_name_prov[k2][0])
                    weak_name_prov_only += 1
                    found = True

        if not found and nn:
            # ultimo tentativo: nome univoco in tutto il DB (URL senza slug o mismatch città)
            if nn in by_name_only and len(by_name_only[nn]) == 1:
                matched_sp_ids.add(by_name_only[nn][0])
                name_only_unique += 1
                found = True

        if not found:
            csv_unmatched += 1

    # DB non coperti dal CSV (nessun match forte/weak)
    # Ricalcolo: specialist che non sono in matched_sp_ids
    all_sp_ids = {str(sp.id) for sp in sps}
    db_not_in_csv = len(all_sp_ids - matched_sp_ids)

    print("=== Report confronto (solo lettura) ===")
    print(f"File CSV: {args.csv}")
    print(f"Righe CSV (dati): {len(rows)}")
    print(f"Righe specialists nel DB: {len(sps)}")
    print()
    print("--- Schema CSV Italia vs import veterinari.csv ---")
    print(f"Colonne CSV Italia: {list(rows[0].keys()) if rows else []}")
    print(
        "NOTA: import_from_frontend_dataset.py si aspetta colonne come `veterinari.csv` "
        "(name, province, city, address, business_status, ...). "
        "Questo CSV ha solo name/url/metadata regione — NON è importabile direttamente con lo script attuale."
    )
    print()
    print("--- Match nome + località da URL (NO indirizzo stradale nel CSV) ---")
    print(f"Righe CSV con URL da cui NON si ricava comune-XX: {no_loc_in_url}")
    print(f"Match nome+città+prov (da URL): {strong}")
    print(f"Match nome+prov (solo, un solo specialist in quella provincia): {weak_name_prov_only}")
    print(f"Match nome univoco in tutto il DB (senza località URL affidabile): {name_only_unique}")
    print(f"Righe CSV senza alcun match in DB: {csv_unmatched}")
    print(f"Specialist distinti in DB con almeno una riga CSV abbinata: {len(matched_sp_ids)}")
    print(f"Specialist DB che non risultano abbinati a nessuna riga CSV: {db_not_in_csv}")
    print()
    print(
        "Interpretazione: i numeri sono stime conservative (URL senza slug comune-XX non matchano; "
        "omonimi stessa provincia non assegnati a weak)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
