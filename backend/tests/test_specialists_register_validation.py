"""POST /specialists/register: validazione consensi senza toccare DB oltre al parsing."""
from __future__ import annotations

from fastapi.testclient import TestClient


def test_register_rejects_missing_terms_ack(client: TestClient) -> None:
    r = client.post(
        "/specialists/register",
        json={
            "email": "vet_terms_test@example.com",
            "password": "SecurePass123!",
            "full_name": "Dr Test",
            "city": "Lecce",
            "province": "LE",
            "specialty_slugs": ["nonexistent_slug_only_for_validation"],
            "species_tags": [],
            "terms_ack": False,
            "registration_consent": True,
        },
    )
    assert r.status_code == 400
    assert "termini" in r.json().get("detail", "").lower()


def test_register_rejects_missing_registration_consent(client: TestClient) -> None:
    r = client.post(
        "/specialists/register",
        json={
            "email": "vet_consent_test@example.com",
            "password": "SecurePass123!",
            "full_name": "Dr Test",
            "city": "Lecce",
            "province": "LE",
            "specialty_slugs": ["nonexistent_slug_only_for_validation"],
            "species_tags": [],
            "terms_ack": True,
            "registration_consent": False,
        },
    )
    assert r.status_code == 400
    assert "termini" in r.json().get("detail", "").lower()
