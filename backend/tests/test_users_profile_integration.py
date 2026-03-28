"""Integrazione: login + GET/PATCH profilo + CRUD indirizzo/animale (richiede PostgreSQL raggiungibile).

Eseguire esplicitamente: ``ENABLE_PROFILE_INTEGRATION=1 pytest tests/test_users_profile_integration.py -q``
(con ``DATABASE_URL`` in ambiente o in ``backend/.env``) per evitare hang in CI senza DB.
"""
from __future__ import annotations

import os
import uuid
from pathlib import Path

import pytest
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")
from fastapi.testclient import TestClient
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.entities import User


pytestmark = pytest.mark.skipif(
    os.getenv("ENABLE_PROFILE_INTEGRATION") != "1",
    reason="Impostare ENABLE_PROFILE_INTEGRATION=1 per test integrazione profilo (PostgreSQL)",
)


def _db_reachable() -> bool:
    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
        return True
    except OperationalError:
        return False
    finally:
        db.close()


def test_logged_in_profile_and_address_animal_crud(client: TestClient) -> None:
    if not _db_reachable():
        pytest.skip("Database non raggiungibile")

    suffix = uuid.uuid4().hex[:12]
    email = f"pytest_profile_{suffix}@example.com"
    password = "PytestProfilePass123!"

    db = SessionLocal()
    try:
        user = User(
            email=email,
            full_name="Pytest Profilo",
            hashed_password=hash_password(password),
            phone=None,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        user_id = user.id
    finally:
        db.close()

    try:
        r_login = client.post("/auth/login", json={"email": email, "password": password})
        assert r_login.status_code == 200, r_login.text
        token = r_login.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        r_profile = client.get("/users/me/profile", headers=headers)
        assert r_profile.status_code == 200, r_profile.text
        data = r_profile.json()
        assert data["email"] == email
        assert data["full_name"] == "Pytest Profilo"
        assert data["profile_notes_for_vets"] is None
        assert data["linked_specialist"] is None
        assert data["addresses"] == []
        assert data["animals"] == []

        r_patch = client.patch(
            "/users/me",
            headers=headers,
            json={"profile_notes_for_vets": "Nota test pytest", "phone": "+390000000000"},
        )
        assert r_patch.status_code == 200, r_patch.text
        assert r_patch.json()["profile_notes_for_vets"] == "Nota test pytest"

        r_addr = client.post(
            "/users/me/addresses",
            headers=headers,
            json={"city": "Lecce", "province": "LE", "cap": "73100", "street": "Via Test 1", "label": "Casa"},
        )
        assert r_addr.status_code == 200, r_addr.text
        addr_id = r_addr.json()["id"]

        r_an = client.post(
            "/users/me/animals",
            headers=headers,
            json={"species": "cane", "name": "Fido", "notes": "pytest"},
        )
        assert r_an.status_code == 200, r_an.text
        an_id = r_an.json()["id"]

        r_del_addr = client.delete(f"/users/me/addresses/{addr_id}", headers=headers)
        assert r_del_addr.status_code == 204
        assert r_del_addr.content == b""

        r_del_an = client.delete(f"/users/me/animals/{an_id}", headers=headers)
        assert r_del_an.status_code == 204
        assert r_del_an.content == b""

        r_final = client.get("/users/me/profile", headers=headers)
        assert r_final.status_code == 200
        assert r_final.json()["addresses"] == []
        assert r_final.json()["animals"] == []
    finally:
        db = SessionLocal()
        try:
            u = db.get(User, user_id)
            if u:
                db.delete(u)
                db.commit()
        finally:
            db.close()
