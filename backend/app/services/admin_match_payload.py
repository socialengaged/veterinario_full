"""Costruzione payload match specialisti per email admin (tabella, mailto, WhatsApp)."""
from __future__ import annotations

import re
from typing import Any, Optional
from urllib.parse import quote

from app.models.entities import Specialist

# Spezza più numeri nello stesso campo (es. "0832 / 333 …")
PHONE_SPLIT_RE = re.compile(r"\s*(?:/|\||;|\n|(?:\s+-\s+))\s*")


def split_phone_segments(raw: Optional[str]) -> list[str]:
    if not raw or not str(raw).strip():
        return []
    return [p.strip() for p in PHONE_SPLIT_RE.split(raw.strip()) if p.strip()]


def classify_it_phone_label(segment: str) -> str:
    d = re.sub(r"\D", "", segment)
    if not d:
        return "Tel."
    if d.startswith("39"):
        d = d[2:]
    if d.startswith("0"):
        return "Fisso"
    if len(d) >= 9 and d[0] == "3":
        return "Mobile"
    return "Tel."


def specialist_phone_lines_for_email(raw: Optional[str]) -> list[dict[str, str]]:
    segs = split_phone_segments(raw)
    if not segs:
        return []
    if len(segs) == 1:
        return [{"label": "Tel.", "number": segs[0]}]
    return [{"label": classify_it_phone_label(seg), "number": seg} for seg in segs]


def first_phone_segment_for_tel_link(raw: Optional[str]) -> Optional[str]:
    segs = split_phone_segments(raw)
    return segs[0] if segs else None


def pick_phone_for_whatsapp(raw: Optional[str]) -> Optional[str]:
    segs = split_phone_segments(raw)
    if not segs:
        return (raw or "").strip() or None
    for seg in segs:
        if classify_it_phone_label(seg) == "Mobile":
            return seg
    return segs[0]


def normalize_specialist_website_href(raw: Optional[str]) -> Optional[str]:
    if not raw or not str(raw).strip():
        return None
    u = raw.strip()
    if u.startswith(("http://", "https://")):
        return u
    return f"https://{u}"


def tel_href(phone: Optional[str]) -> Optional[str]:
    if not phone or not str(phone).strip():
        return None
    compact = re.sub(r"\s+", "", phone.strip())
    if not compact:
        return None
    return f"tel:{compact}"


def normalize_phone_for_wa(phone: Optional[str]) -> Optional[str]:
    """Restituisce solo cifre per wa.me (es. 393201234567) o None."""
    if not phone or not str(phone).strip():
        return None
    d = re.sub(r"\D", "", phone.strip())
    if not d:
        return None
    if d.startswith("39") and len(d) >= 11:
        return d
    if len(d) == 10 and d.startswith("3"):
        return "39" + d
    if len(d) == 9 and d.startswith("3"):
        return "39" + d
    if len(d) >= 11:
        return d
    return None


def build_mailto_specialist_url(
    *,
    specialist_email: str,
    subject: str,
    body: str,
) -> str:
    return (
        f"mailto:{quote(specialist_email, safe='')}"
        f"?subject={quote(subject, safe='')}"
        f"&body={quote(body, safe='')}"
    )


def build_whatsapp_url(phone: Optional[str], text: str) -> Optional[str]:
    digits = normalize_phone_for_wa(phone)
    if not digits:
        return None
    return f"https://wa.me/{digits}?text={quote(text, safe='')}"


def admin_team_whatsapp_url_with_text(base_whatsapp_url: str, whatsapp_text: str) -> str:
    """Es. base https://wa.me/393204864478 → aggiunge ?text= per aprire chat team con testo."""
    base = (base_whatsapp_url or "").strip().split("?")[0].rstrip("/")
    if not base:
        base = "https://wa.me/393204864478"
    return f"{base}?text={quote(whatsapp_text, safe='')}"


def mailto_body_for_specialist(
    *,
    user_name: str,
    user_email: str,
    user_phone: str,
    animal_species: str,
    city: str,
    province: str,
    user_cap: Optional[str],
    specialty_name: str,
    description: Optional[str],
    specialist_name: str,
    profile_notes: Optional[str] = None,
) -> str:
    lines = [
        "Messaggio da VeterinarioVicino.it",
        "",
        f"Richiesta per contatto con: {specialist_name}",
        "",
        f"Utente: {user_name}",
        f"Email: {user_email}",
        f"Telefono: {user_phone or '-'}",
        f"Animale: {animal_species}",
        f"Zona utente: {city} ({province})" + (f" — CAP {user_cap}" if user_cap else ""),
        f"Servizio richiesto: {specialty_name}",
    ]
    if profile_notes and str(profile_notes).strip():
        lines.extend(["", "Note profilo utente (persistenti):", str(profile_notes).strip()])
    if description and str(description).strip():
        lines.extend(["", "Nota della richiesta:", str(description).strip()])
    lines.extend(["", "---", "Rispondere all'utente utilizzando i contatti sopra."])
    return "\n".join(lines)


def whatsapp_text_for_specialist(
    *,
    user_name: str,
    user_email: str,
    user_phone: str,
    animal_species: str,
    city: str,
    province: str,
    user_cap: Optional[str],
    specialty_name: str,
    description: Optional[str],
    specialist_name: str,
    profile_notes: Optional[str] = None,
) -> str:
    """Testo breve per WA verso un singolo specialista."""
    parts = [
        f"Salve, sono il team VeterinarioVicino.",
        f"Richiesta di contatto per {specialist_name}.",
        f"Utente: {user_name} ({user_email}) tel {user_phone or '-'}",
        f"Animale: {animal_species}, zona {city} ({province})"
        + (f", CAP {user_cap}" if user_cap else ""),
        f"Servizio: {specialty_name}",
    ]
    if profile_notes and str(profile_notes).strip():
        parts.append(f"Note profilo: {str(profile_notes).strip()[:400]}")
    if description and str(description).strip():
        parts.append(f"Nota richiesta: {str(description).strip()}")
    return "\n".join(parts)


def enrich_specialist_matches(
    scored: list[tuple[Specialist, float]],
    *,
    specialty_name: str,
    user_name: str,
    user_email: str,
    user_phone: str,
    animal_species: str,
    city: str,
    province: str,
    user_cap: Optional[str],
    description: Optional[str],
    profile_notes: Optional[str] = None,
) -> list[dict[str, Any]]:
    """Arricchisce i match con campi per template email (tabella + link)."""
    out: list[dict[str, Any]] = []
    subj = f"Richiesta contatto da VeterinarioVicino — {city}"
    for sp, sc in scored:
        body = mailto_body_for_specialist(
            user_name=user_name,
            user_email=user_email,
            user_phone=user_phone,
            animal_species=animal_species,
            city=city,
            province=province,
            user_cap=user_cap,
            specialty_name=specialty_name,
            description=description,
            specialist_name=sp.full_name,
            profile_notes=profile_notes,
        )
        wa_txt = whatsapp_text_for_specialist(
            user_name=user_name,
            user_email=user_email,
            user_phone=user_phone,
            animal_species=animal_species,
            city=city,
            province=province,
            user_cap=user_cap,
            specialty_name=specialty_name,
            description=description,
            specialist_name=sp.full_name,
            profile_notes=profile_notes,
        )
        mailto = build_mailto_specialist_url(
            specialist_email=sp.email,
            subject=subj,
            body=body,
        )
        wa_url = build_whatsapp_url(pick_phone_for_whatsapp(sp.phone), wa_txt)
        phone_lines = specialist_phone_lines_for_email(sp.phone)
        first_tel = first_phone_segment_for_tel_link(sp.phone)
        web_href = normalize_specialist_website_href(getattr(sp, "website_url", None))
        spec_labels = ", ".join(s.name for s in (sp.specialties or []))
        out.append(
            {
                "id": str(sp.id),
                "name": sp.full_name,
                "city": sp.city,
                "province": sp.province,
                "cap": sp.cap or "",
                "street_address": sp.street_address or "",
                "email": sp.email,
                "phone": sp.phone or "",
                "phone_lines": phone_lines,
                "tel_href": tel_href(first_tel or sp.phone),
                "website_href": web_href or "",
                "specialty_name": specialty_name,
                "specialties_display": spec_labels or specialty_name,
                "score": sc,
                "mailto_url": mailto,
                "whatsapp_url": wa_url,
            }
        )
    return out
