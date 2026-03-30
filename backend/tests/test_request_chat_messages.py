"""Messaggi chat alla creazione richiesta e dopo verify (richiede DB)."""
from __future__ import annotations

import os
import uuid
from urllib.parse import urlparse, parse_qs

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import OperationalError

pytestmark = pytest.mark.skipif(
    not os.getenv("DATABASE_URL"),
    reason="DATABASE_URL non impostato (test integrazione opzionale)",
)


def _body(email: str) -> dict:
    return {
        "email": email,
        "full_name": "Chat Msg Test",
        "city": "Lecce",
        "province": "LE",
        "animal": {"species": "cane", "name": "Fido"},
        "service": "visita_generica",
        "description": "Note dalla richiesta per la chat",
        "email_verification_ack": True,
        "registration_consent": True,
        "password": "ChatMsgTestPwd123!",
    }


def test_create_request_puts_user_message_before_system() -> None:
    from app.main import app

    try:
        from app.db.session import SessionLocal
        from sqlalchemy import text

        db = SessionLocal()
        try:
            db.execute(text("SELECT 1"))
        finally:
            db.close()
    except OperationalError:
        pytest.skip("Database non raggiungibile")

    client = TestClient(app)
    email = f"chat_msg_{uuid.uuid4().hex[:12]}@example.com"
    r = client.post("/requests", json=_body(email))
    assert r.status_code == 200, r.text
    data = r.json()
    token = data["access_token"]
    cid = data["conversation_id"]

    ch = client.get(
        f"/dashboard/chats/{cid}",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert ch.status_code == 200, ch.text
    msgs = ch.json()["messages"]
    assert len(msgs) >= 2
    assert msgs[0]["sender_role"] == "user"
    assert "Note dalla richiesta" in msgs[0]["body"]
    assert msgs[1]["sender_role"] == "system"


def test_verify_email_adds_confirmation_without_duplicate_user_message() -> None:
    from app.main import app

    try:
        from app.db.session import SessionLocal
        from sqlalchemy import text

        db = SessionLocal()
        try:
            db.execute(text("SELECT 1"))
        finally:
            db.close()
    except OperationalError:
        pytest.skip("Database non raggiungibile")

    client = TestClient(app)
    email = f"chat_msg_v_{uuid.uuid4().hex[:12]}@example.com"
    r = client.post("/requests", json=_body(email))
    assert r.status_code == 200, r.text
    data = r.json()
    token = data["access_token"]
    cid = data["conversation_id"]
    redir = data["redirect_url"]
    q = parse_qs(urlparse(redir).query)
    raw_tok = q.get("token", [None])[0]
    assert raw_tok

    v = client.post("/auth/verify-email", json={"token": raw_tok})
    assert v.status_code == 200, v.text

    ch = client.get(
        f"/dashboard/chats/{cid}",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert ch.status_code == 200, ch.text
    msgs = ch.json()["messages"]
    user_msgs = [m for m in msgs if m["sender_role"] == "user"]
    assert len(user_msgs) == 1
    assert "Note dalla richiesta" in user_msgs[0]["body"]
    system_msgs = [m for m in msgs if m["sender_role"] == "system"]
    assert len(system_msgs) == 2
