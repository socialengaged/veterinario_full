from __future__ import annotations

from typing import Any


def build_admin_whatsapp_payload(
    *,
    user_email: str,
    user_name: str,
    user_phone: str | None,
    animal_species: str,
    animal_name: str | None,
    city: str,
    province: str,
    specialty: str,
    urgency: str,
    description: str | None,
    matches: list[dict[str, Any]],
    profile_notes: str | None = None,
) -> dict[str, Any]:
    lines = [
        "*Nuova richiesta VeterinarioVicino*",
        f"Nome: {user_name}",
        f"Email: {user_email}",
        f"Tel: {user_phone or '-'}",
        f"Animale: {animal_species}" + (f" ({animal_name})" if animal_name else ""),
        f"Città: {city} / {province}",
        f"Servizio: {specialty}",
        f"Urgenza: {urgency}",
    ]
    if profile_notes and str(profile_notes).strip():
        lines.append(f"Note profilo: {str(profile_notes).strip()[:500]}")
    if description:
        lines.append(f"Note richiesta: {description}")
    lines.append("")
    lines.append("*Match specialisti:*")
    if not matches:
        lines.append("(nessun match trovato — verificare mapping)")
    else:
        for m in matches:
            cap = (m.get("cap") or "").strip()
            extra = f" | CAP {cap}" if cap else ""
            lines.append(
                f"- {m.get('name')} | {m.get('city')}{extra} | score {m.get('score')}"
            )
    lines.append("")
    lines.append("_Copia incolla su WhatsApp per inoltrare al team._")
    whatsapp_text = "\n".join(lines)
    return {
        "whatsapp_text": whatsapp_text,
        "user": {"email": user_email, "name": user_name, "phone": user_phone},
        "animal": {"species": animal_species, "name": animal_name},
        "location": {"city": city, "province": province},
        "specialty": specialty,
        "urgency": urgency,
        "description": description,
        "matches": matches,
    }
