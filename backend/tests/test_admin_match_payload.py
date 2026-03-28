"""Test helper URL e arricchimento match admin."""
from __future__ import annotations

from uuid import uuid4

from app.models.entities import Specialist
from app.services.admin_match_payload import (
    admin_team_whatsapp_url_with_text,
    build_whatsapp_url,
    enrich_specialist_matches,
    normalize_phone_for_wa,
    specialist_phone_lines_for_email,
)


def test_normalize_phone_for_wa_italian_mobile():
    assert normalize_phone_for_wa("+39 320 1111111") == "393201111111"


def test_specialist_phone_lines_fisso_e_mobile():
    lines = specialist_phone_lines_for_email("0832 303958 / +39 333 4445566")
    assert len(lines) == 2
    assert {"Fisso", "Mobile"} <= {x["label"] for x in lines}


def test_specialist_phone_lines_single():
    lines = specialist_phone_lines_for_email("+39 320 1111111")
    assert len(lines) == 1 and lines[0]["label"] == "Tel."


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
        website_url="https://ambulatorio.example.com",
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
    assert out[0]["website_href"] == "https://ambulatorio.example.com"
    assert out[0]["phone_lines"] and out[0]["phone_lines"][0]["number"]
    assert out[0]["tel_href"] and out[0]["tel_href"].startswith("tel:")
