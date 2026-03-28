"""
Validazione pre-produzione (richiede PostgreSQL, seed, .env in backend/).

Eseguire da cartella backend:
  set PYTHONPATH=..   (Windows, root repo) oppure cd backend
  python scripts/validate_preprod.py

Oppure dalla root repo:
  set PYTHONPATH=.
  python backend/scripts/validate_preprod.py
"""
from __future__ import annotations

import os
import sys
import time
from pathlib import Path
from uuid import UUID

# cwd / import path
_backend = Path(__file__).resolve().parent.parent
if str(_backend) not in sys.path:
    sys.path.insert(0, str(_backend))
os.chdir(_backend)

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("validate_preprod")

from fastapi.testclient import TestClient
from sqlalchemy import func, select
from sqlalchemy.exc import OperationalError

from app.main import app
from app.models.entities import (
    AdminNotification,
    Animal,
    Conversation,
    Message,
    RequestMatch,
    User,
    VetRequest,
)
from app.db.session import SessionLocal


def counts(db) -> dict[str, int]:
    return {
        "users": db.scalar(select(func.count()).select_from(User)) or 0,
        "animals": db.scalar(select(func.count()).select_from(Animal)) or 0,
        "vet_requests": db.scalar(select(func.count()).select_from(VetRequest)) or 0,
        "conversations": db.scalar(select(func.count()).select_from(Conversation)) or 0,
        "messages": db.scalar(select(func.count()).select_from(Message)) or 0,
        "request_matches": db.scalar(select(func.count()).select_from(RequestMatch)) or 0,
        "admin_notifications": db.scalar(select(func.count()).select_from(AdminNotification)) or 0,
    }


def main() -> int:
    errors: list[str] = []
    try:
        db = SessionLocal()
        try:
            db.scalar(select(func.count()).select_from(User))
        finally:
            db.close()
    except OperationalError as e:
        print("STATUS: NOT_READY")
        print("ERRORI:")
        print(" - PostgreSQL non raggiungibile:", e)
        print("  Avviare Postgres, eseguire alembic upgrade head e scripts/seed.py poi ripetere.")
        return 1

    client = TestClient(app)

    body1 = {
        "first_name": "Test",
        "last_name": "User",
        "email": "test1@email.com",
        "phone": "+393000000001",
        "city": "Lecce",
        "province": "LE",
        "animal": {"species": "cane", "name": "TestDog"},
        "service": "visita_generica",
        "urgency": "media",
        "description": "Test reale completo",
        "email_verification_ack": True,
        "registration_consent": True,
        "marketing_consent": False,
        "password": "ValidatePreprod123!",
    }

    db = SessionLocal()
    try:
        c0 = counts(db)
    finally:
        db.close()

    t0 = time.perf_counter()
    r1 = client.post("/requests", json=body1)
    t1 = time.perf_counter()
    if r1.status_code != 200:
        errors.append(f"POST /requests 1: {r1.status_code} {r1.text}")
        print("STATUS: NOT_READY")
        print("ERRORI:", errors)
        return 1

    data1 = r1.json()
    uid = data1.get("user_id")
    req_id = data1.get("request_id")
    conv_id = data1.get("conversation_id")
    token = data1.get("access_token")

    db = SessionLocal()
    try:
        c1 = counts(db)
        if c1["users"] < c0["users"] + 1:
            errors.append(f"users: atteso +1, prima {c0['users']} dopo {c1['users']}")
        if c1["animals"] < c0["animals"] + 1:
            errors.append(f"animals: atteso +1, prima {c0['animals']} dopo {c1['animals']}")
        if c1["vet_requests"] < c0["vet_requests"] + 1:
            errors.append(f"requests: atteso +1")
        if c1["conversations"] < c0["conversations"] + 1:
            errors.append(f"conversations: atteso +1")
        if c1["messages"] < c0["messages"] + 1:
            errors.append(f"messages: atteso +1")
        if c1["request_matches"] < c0["request_matches"] + 1:
            errors.append(f"request_matches: atteso >=1 nuovo match")
        if c1["admin_notifications"] < c0["admin_notifications"] + 1:
            errors.append(f"admin_notifications: atteso +1")

        an = db.scalar(select(AdminNotification).order_by(AdminNotification.created_at.desc()).limit(1))
        if an and isinstance(an.payload_json, dict):
            pj = an.payload_json
            if "whatsapp_text" not in pj or not pj.get("whatsapp_text"):
                errors.append("admin_notifications.payload_json senza whatsapp_text")
            for k in ("user", "animal", "matches"):
                if k not in pj:
                    errors.append(f"payload_json manca chiave {k}")

        matches = db.scalars(
            select(RequestMatch).where(RequestMatch.request_id == UUID(req_id)).order_by(RequestMatch.score.desc())
        ).all()
        if not matches:
            errors.append("request_matches vuoto")
        else:
            scores = [m.score for m in matches]
            if scores != sorted(scores, reverse=True):
                errors.append(f"ordinamento score non decrescente: {scores}")
    finally:
        db.close()

    # secondo POST stessa email
    body2 = {
        **body1,
        "animal": {"species": "cane", "name": "TestDog2"},
        "description": "Seconda richiesta",
    }
    r2 = client.post("/requests", json=body2)
    if r2.status_code != 200:
        errors.append(f"POST /requests 2: {r2.status_code} {r2.text}")

    db = SessionLocal()
    try:
        users_n = db.scalar(select(func.count()).select_from(User))
        if users_n != c1["users"]:
            errors.append(f"utente duplicato? users ora {users_n}, atteso {c1['users']}")
    finally:
        db.close()

    # chat
    h = {"Authorization": f"Bearer {token}"}
    rc = client.get("/dashboard/chats", headers=h)
    if rc.status_code != 200:
        errors.append(f"GET /dashboard/chats: {rc.status_code} {rc.text}")
    else:
        chats = rc.json()
        cid = None
        for ch in chats:
            if str(ch.get("request_id")) == str(req_id):
                cid = ch.get("id")
                break
        if not cid:
            cid = conv_id
        rd = client.get(f"/dashboard/chats/{cid}", headers=h)
        if rd.status_code != 200:
            errors.append(f"GET /dashboard/chats/{{id}}: {rd.status_code}")
        else:
            msgs = rd.json().get("messages", [])
            if not any("ricevuto" in m.get("body", "").lower() for m in msgs):
                errors.append("messaggio iniziale sistema non trovato")

    # 5 richieste performance
    for i in range(5):
        t_a = time.perf_counter()
        rr = client.post(
            "/requests",
            json={
                "email": f"perf{i}@example.com",
                "first_name": "P",
                "last_name": str(i),
                "phone": "+393000000099",
                "city": "Lecce",
                "province": "LE",
                "animal": {"species": "gatto", "name": "X"},
                "service": "visita_generica",
                "urgency": "bassa",
                "email_verification_ack": True,
                "registration_consent": True,
                "password": "PerfLoop123456!",
            },
        )
        t_b = time.perf_counter()
        if rr.status_code != 200:
            errors.append(f"perf {i}: {rr.status_code}")
        if (t_b - t_a) > 1.0:
            errors.append(f"perf {i}: tempo {(t_b-t_a):.2f}s > 1s")

    print("timing POST1:", f"{(t1-t0):.3f}s")

    if errors:
        print("STATUS: NOT_READY")
        print("ERRORI:")
        for e in errors:
            print(" -", e)
        return 1

    print("STATUS: READY_FOR_OVH")
    print("ERRORI: (nessuno)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
