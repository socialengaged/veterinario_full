#!/usr/bin/env python3
"""
Scrape scheda PagineGialle (JSON-LD LocalBusiness) e aggiorna specialists per import_batch.

Campi aggiornati: phone_fixed, phone_mobile, phone (combinato per compatibilità WA/email),
contact_email, street_address, cap, website_url (se sito esterno), opening_hours,
business_description.

Solo righe con website_url che contiene paginegialle.it e import_batch indicato.

  python scripts/scrape_paginegialle_specialists.py --dry-run --limit 5
  python scripts/scrape_paginegialle_specialists.py
  python scripts/scrape_paginegialle_specialists.py --min-delay 1.5

Background (Linux): nohup python scripts/scrape_paginegialle_specialists.py >> /tmp/pg_scrape.log 2>&1 &
"""
from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path as PathType

import httpx

_scripts = PathType(__file__).resolve().parent
_backend = _scripts.parent
if str(_backend) not in sys.path:
    sys.path.insert(0, str(_backend))

from sqlalchemy import and_, select  # noqa: E402

from app.db.session import SessionLocal  # noqa: E402
from app.models.entities import Specialist  # noqa: E402
from app.services.pg_jsonld_parse import parse_paginegialle_html  # noqa: E402

USER_AGENT = (
    "VeterinarioVicino/1.0 (pg-scheda-jsonld; https://veterinariovicino.it; batch specialist)"
)


def fetch_html(url: str, client: httpx.Client) -> tuple[str | None, str | None]:
    try:
        r = client.get(url, timeout=45.0, follow_redirects=True)
        if r.status_code == 429:
            return None, "http_429"
        r.raise_for_status()
        return r.text, None
    except Exception as e:
        return None, str(e)[:120]


def apply_parsed_to_specialist(sp: Specialist, parsed: dict, *, overwrite: bool) -> list[str]:
    """Ritorna lista di chiavi effettivamente modificate."""
    changed: list[str] = []

    def set_if(field: str, value: object | None, current: object | None) -> None:
        nonlocal changed
        if value is None or (isinstance(value, str) and not value.strip()):
            return
        if not overwrite and current is not None and str(current).strip():
            return
        setattr(sp, field, value)
        changed.append(field)

    set_if("phone_fixed", parsed.get("phone_fixed"), sp.phone_fixed)
    set_if("phone_mobile", parsed.get("phone_mobile"), sp.phone_mobile)

    comb = parsed.get("combined_phone")
    if comb and (overwrite or not (sp.phone and str(sp.phone).strip())):
        sp.phone = comb[:64] if len(comb) > 64 else comb
        if "phone" not in changed:
            changed.append("phone")

    set_if("contact_email", parsed.get("contact_email"), sp.contact_email)
    set_if("street_address", parsed.get("street_address"), sp.street_address)
    set_if("cap", parsed.get("cap"), sp.cap)
    set_if("opening_hours", parsed.get("opening_hours"), sp.opening_hours)
    set_if("business_description", parsed.get("description"), sp.business_description)

    ext = parsed.get("website_url_external")
    if ext:
        cur = (sp.website_url or "").strip()
        is_pg = "paginegialle.it" in cur.lower()
        if overwrite or not cur or is_pg:
            sp.website_url = ext[:2048]
            if "website_url" not in changed:
                changed.append("website_url")

    return changed


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--import-batch", default="italia_pg_2026_04")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="Max righe (0 = tutte)")
    ap.add_argument("--min-delay", type=float, default=1.25, help="Secondi tra richieste HTTP")
    ap.add_argument(
        "--overwrite",
        action="store_true",
        help="Sovrascrive anche campi già valorizzati (default: solo vuoti)",
    )
    args = ap.parse_args()

    db = SessionLocal()
    try:
        q = (
            select(Specialist)
            .where(
                and_(
                    Specialist.import_batch == args.import_batch,
                    Specialist.website_url.isnot(None),
                )
            )
            .order_by(Specialist.id)
        )
        rows = db.execute(q).scalars().all()
        rows = [sp for sp in rows if "paginegialle.it" in (sp.website_url or "").lower()]
        if args.limit > 0:
            rows = rows[: args.limit]
        print(f"Da processare: {len(rows)} specialist (batch={args.import_batch}, solo URL PG)")
    finally:
        db.close()

    if not rows:
        print("Nessuna riga.")
        return 0

    stats = {"ok": 0, "no_ld": 0, "http_err": 0, "skip": 0, "updated": 0}
    headers = {"User-Agent": USER_AGENT}

    with httpx.Client(headers=headers, follow_redirects=True) as client:
        for i, sp in enumerate(rows):
            url = (sp.website_url or "").strip()
            html, err = fetch_html(url, client)
            if err:
                print(f"[{i+1}/{len(rows)}] SKIP {sp.id} {err} {url[:60]}...", flush=True)
                stats["http_err"] += 1
                time.sleep(args.min_delay)
                continue
            assert html is not None
            parsed = parse_paginegialle_html(html, url)
            if not parsed.get("found_ld"):
                print(f"[{i+1}/{len(rows)}] NO_LD {sp.id} {url[:70]}...", flush=True)
                stats["no_ld"] += 1
                time.sleep(args.min_delay)
                continue

            db = SessionLocal()
            try:
                row = db.get(Specialist, sp.id)
                if row is None:
                    stats["skip"] += 1
                    continue
                changed = apply_parsed_to_specialist(row, parsed, overwrite=args.overwrite)
                if changed:
                    stats["updated"] += 1
                    stats["ok"] += 1
                    if args.dry_run:
                        db.rollback()
                    else:
                        db.commit()
                    print(
                        f"[{i+1}/{len(rows)}] OK {row.full_name[:40]} | {changed} | ld=yes",
                        flush=True,
                    )
                else:
                    db.rollback()
                    stats["skip"] += 1
                    print(f"[{i+1}/{len(rows)}] no_change {sp.id}", flush=True)
            except Exception as e:
                db.rollback()
                print(f"[{i+1}/{len(rows)}] ERR {sp.id} {e!s}", flush=True)
            finally:
                db.close()

            if i < len(rows) - 1:
                time.sleep(args.min_delay)

    print(
        f"Fine. ok_ld_updates={stats['ok']} updated_rows={stats['updated']} "
        f"no_ld={stats['no_ld']} http_err={stats['http_err']} skip_no_change={stats['skip']} dry_run={args.dry_run}",
        flush=True,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
