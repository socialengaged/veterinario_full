"""
Estrazione dati da schede PagineGialle tramite JSON-LD (schema.org LocalBusiness).
Usato dallo scraper batch; testabile senza rete.
"""
from __future__ import annotations

import json
import re
from typing import Any, Optional

LD_JSON_RE = re.compile(
    r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)


def _type_is_local_business(d: dict) -> bool:
    t = d.get("@type")
    if t == "LocalBusiness":
        return True
    if isinstance(t, list):
        return "LocalBusiness" in t
    return False


def extract_local_business_dict(html: str) -> Optional[dict[str, Any]]:
    """Primo blocco JSON-LD LocalBusiness nella pagina."""
    for m in LD_JSON_RE.finditer(html):
        raw = m.group(1).strip()
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            continue
        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict) and _type_is_local_business(item):
                    return item
        elif isinstance(data, dict) and _type_is_local_business(data):
            return data
    return None


def _digits_it(phone: str) -> str:
    d = re.sub(r"\D", "", (phone or "").strip())
    if d.startswith("39") and len(d) > 10:
        d = d[2:]
    return d


def _is_mobile_it(digits: str) -> bool:
    if not digits:
        return False
    if len(digits) >= 9 and digits[0] == "3":
        return True
    return False


def _normalize_display_phone(raw: str) -> str:
    s = (raw or "").strip()
    s = re.sub(r"^\+\s*39\s*", "", s)
    s = re.sub(r"^\+\s*", "", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def collect_phones_from_ld(ld: dict[str, Any]) -> list[str]:
    out: list[str] = []
    t = ld.get("telephone")
    if t:
        if isinstance(t, list):
            out.extend(str(x) for x in t)
        else:
            out.append(str(t))
    for cp in ld.get("contactPoint") or []:
        if not isinstance(cp, dict):
            continue
        tel = cp.get("telephone")
        if tel:
            out.append(str(tel))
    seen: set[str] = set()
    uniq: list[str] = []
    for p in out:
        k = _digits_it(p)
        if k and k not in seen:
            seen.add(k)
            uniq.append(_normalize_display_phone(p))
    return uniq


def split_fixed_mobile(phones: list[str]) -> tuple[Optional[str], Optional[str]]:
    fixed_list: list[str] = []
    mobile_list: list[str] = []
    for p in phones:
        d = _digits_it(p)
        if _is_mobile_it(d):
            mobile_list.append(_normalize_display_phone(p))
        else:
            fixed_list.append(_normalize_display_phone(p))

    def join(xs: list[str]) -> Optional[str]:
        if not xs:
            return None
        return " / ".join(xs) if len(xs) > 1 else xs[0]

    return join(fixed_list), join(mobile_list)


def collect_emails_from_ld(ld: dict[str, Any]) -> list[str]:
    out: list[str] = []
    for cp in ld.get("contactPoint") or []:
        if not isinstance(cp, dict):
            continue
        em = cp.get("email")
        if em and isinstance(em, str) and "@" in em:
            out.append(em.strip().lower())
    seen: set[str] = set()
    uniq: list[str] = []
    for e in out:
        if e not in seen:
            seen.add(e)
            uniq.append(e)
    return uniq


def address_parts_from_ld(ld: dict[str, Any]) -> tuple[Optional[str], Optional[str]]:
    addr = ld.get("address")
    if not isinstance(addr, dict):
        return None, None
    street = (addr.get("streetAddress") or "").strip() or None
    cap = (addr.get("postalCode") or "").strip() or None
    return street, cap


def external_website_from_ld(ld: dict[str, Any], page_url: str) -> Optional[str]:
    del page_url  # riservato per filtri futuri
    same = ld.get("sameAs")
    if not same:
        return None
    if isinstance(same, list):
        candidates = [str(x).strip() for x in same if x]
    else:
        candidates = [str(same).strip()]
    pg_host = "paginegialle.it"
    for u in candidates:
        if u and pg_host not in u.lower():
            if u.startswith(("http://", "https://")):
                return u
            return f"https://{u}"
    return None


def opening_hours_text_from_ld(ld: dict[str, Any]) -> Optional[str]:
    oh = ld.get("openingHours")
    if not oh:
        return None
    if isinstance(oh, list):
        return "\n".join(str(x) for x in oh)
    return str(oh).strip() or None


def description_from_ld(ld: dict[str, Any]) -> Optional[str]:
    d = ld.get("description")
    if not d:
        return None
    s = str(d).strip()
    return s[:4000] if len(s) > 4000 else s


def parse_paginegialle_html(html: str, page_url: str) -> dict[str, Any]:
    ld = extract_local_business_dict(html)
    if not ld:
        return {
            "phone_fixed": None,
            "phone_mobile": None,
            "contact_email": None,
            "street_address": None,
            "cap": None,
            "website_url_external": None,
            "opening_hours": None,
            "description": None,
            "combined_phone": None,
            "found_ld": False,
        }

    phones = collect_phones_from_ld(ld)
    p_fix, p_mob = split_fixed_mobile(phones)
    parts = []
    if p_fix:
        parts.append(p_fix)
    if p_mob:
        parts.append(p_mob)
    combined = " / ".join(parts) if parts else None

    emails = collect_emails_from_ld(ld)
    contact_email = emails[0] if emails else None

    street, cap = address_parts_from_ld(ld)
    ext_web = external_website_from_ld(ld, page_url)
    oh = opening_hours_text_from_ld(ld)
    desc = description_from_ld(ld)

    return {
        "phone_fixed": p_fix,
        "phone_mobile": p_mob,
        "contact_email": contact_email,
        "street_address": street,
        "cap": cap,
        "website_url_external": ext_web,
        "opening_hours": oh,
        "description": desc,
        "combined_phone": combined,
        "found_ld": True,
    }
