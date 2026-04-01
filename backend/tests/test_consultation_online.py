"""Validazione payload consulenza online su POST /requests."""
from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _base_online(email: str) -> dict:
    return {
        "email": email,
        "full_name": "Test Online",
        "city": "Lecce",
        "province": "LE",
        "animal": {"species": "cane", "name": None},
        "service": "consultazione_online",
        "email_verification_ack": True,
        "registration_consent": True,
        "password": "TestOnline99!",
        "consultation_online": True,
        "consultation_tier": "std_30_50",
        "contact_secondary": None,
    }


def test_consultation_online_rejects_non_dog_cat() -> None:
    body = _base_online("online_bad_animal@example.com")
    body["animal"] = {"species": "coniglio", "name": None}
    r = client.post("/requests", json=body)
    assert r.status_code == 422
    detail = str(r.json().get("detail", ""))
    assert "cani e gatti" in detail.lower()


def test_consultation_online_rejects_wrong_service() -> None:
    body = _base_online("online_bad_svc@example.com")
    body["service"] = "visita_generica"
    r = client.post("/requests", json=body)
    assert r.status_code == 422


def test_consultation_online_rejects_tier_without_flag() -> None:
    body = _base_online("online_tier_only@example.com")
    body["consultation_online"] = False
    r = client.post("/requests", json=body)
    assert r.status_code == 422
