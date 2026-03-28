"""Verifica messaggio errore se email già registrata senza password corretta (richiede DB)."""
from __future__ import annotations

import os

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import OperationalError

pytestmark = pytest.mark.skipif(
    not os.getenv("DATABASE_URL"),
    reason="DATABASE_URL non impostato (test integrazione opzionale)",
)


def test_post_requests_rejects_wrong_password_for_existing_email() -> None:
    from app.db.session import SessionLocal
    from app.main import app

    try:
        from sqlalchemy import text

        db = SessionLocal()
        try:
            db.execute(text("SELECT 1"))
        finally:
            db.close()
    except OperationalError:
        pytest.skip("Database non raggiungibile")

    client = TestClient(app)
    email = "dup_pw_test@example.com"
    pw_ok = "DupPwTestOk123456!"
    pw_wrong = "WrongPassword123456!"

    body_base = {
        "email": email,
        "first_name": "Dup",
        "last_name": "Test",
        "city": "Lecce",
        "province": "LE",
        "animal": {"species": "cane", "name": "X"},
        "service": "visita_generica",
        "email_verification_ack": True,
        "registration_consent": True,
        "password": pw_ok,
    }

    r1 = client.post("/requests", json=body_base)
    assert r1.status_code == 200, r1.text

    r2 = client.post("/requests", json={**body_base, "password": pw_wrong, "description": "seconda"})
    assert r2.status_code == 400
    assert "già registrata" in r2.json().get("detail", "").lower()

    r3 = client.post("/requests", json={**body_base, "password": pw_ok, "description": "terza ok"})
    assert r3.status_code == 200, r3.text
