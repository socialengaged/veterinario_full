"""Costruzione payload match specialisti per email admin (tabella, mailto, WhatsApp)."""
from __future__ import annotations

import re
from typing import Any, Optional
from urllib.parse import quote

from app.models.entities import Specialist


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
    if description and str(description).strip():
        lines.extend(["", "Nota dell'utente:", str(description).strip()])
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
    if description and str(description).strip():
        parts.append(f"Nota: {str(description).strip()}")
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
        )
        mailto = build_mailto_specialist_url(
            specialist_email=sp.email,
            subject=subj,
            body=body,
        )
        wa_url = build_whatsapp_url(sp.phone, wa_txt)
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
                "specialty_name": specialty_name,
                "score": sc,
                "mailto_url": mailto,
                "whatsapp_url": wa_url,
            }
        )
    return out
