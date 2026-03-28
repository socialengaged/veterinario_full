"""Test helper URL e arricchimento match admin."""
from __future__ import annotations

from uuid import uuid4

from app.models.entities import Specialist
from app.services.admin_match_payload import (
    admin_team_whatsapp_url_with_text,
    build_whatsapp_url,
    enrich_specialist_matches,
    normalize_phone_for_wa,
)


def test_normalize_phone_for_wa_italian_mobile():
    assert normalize_phone_for_wa("+39 320 1111111") == "393201111111"


def test_admin_team_whatsapp_url_encodes_text():
    u = admin_team_whatsapp_url_with_text("https://wa.me/393204864478", "ciao mondo")
    assert u.startswith("https://wa.me/393204864478?text=")
    assert "ciao" in u


def test_build_whatsapp_url_none_without_phone():
    assert build_whatsapp_url(None, "x") is None


def test_enrich_specialist_matches_has_mailto_and_wa():
    sp = Specialist(
        id=uuid4(),
        email="v@example.com",
        full_name="Amb. Test",
        city="Lecce",
        province="LE",
        cap="73100",
        street_address="Via X 1",
        phone="+39 320 1111111",
        is_active=True,
        species_tags=["cane"],
    )
    out = enrich_specialist_matches(
        [(sp, 120.0)],
        specialty_name="Visite",
        user_name="Mario",
        user_email="m@example.com",
        user_phone="+39 333",
        animal_species="cane",
        city="Lecce",
        province="LE",
        user_cap="73100",
        description="Dolore zampa",
    )
    assert len(out) == 1
    assert out[0]["cap"] == "73100"
    assert out[0]["street_address"] == "Via X 1"
    assert "mailto:" in out[0]["mailto_url"]
    assert out[0]["whatsapp_url"] and "wa.me" in out[0]["whatsapp_url"]
