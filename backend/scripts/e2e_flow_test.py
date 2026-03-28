"""Eseguito sul server: POST /requests + verifica dashboard chat + messaggio utente."""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

BASE = "http://127.0.0.1:8060"


def main() -> None:
    suffix = datetime.now(timezone.utc).strftime("%H%M%S")
    # Gmail +alias: stessa inbox di seomantis, accettato da Resend in modalità test
    email = f"seomantis+e2e.{suffix}@gmail.com"
    body = {
        "email": email,
        "first_name": "E2E",
        "last_name": "Flusso",
        "phone": "+393204864478",
        "city": "Lecce",
        "province": "LE",
        "animal": {"species": "cane", "name": "Rex"},
        "service": "visita_generica",
        "urgency": "media",
        "description": "Test automatico flusso richiesta + match specialisti zona Lecce",
        "email_verification_ack": True,
        "registration_consent": True,
        "password": "E2EFlowTest123456!",
    }
    req = urllib.request.Request(
        f"{BASE}/requests",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
    )
    try:
        r = urllib.request.urlopen(req, timeout=60)
    except urllib.error.HTTPError as e:
        print(e.read().decode())
        raise
    out = json.loads(r.read().decode())
    token = out["access_token"]
    uid = out["user_id"]
    rid = out["request_id"]
    cid = out["conversation_id"]
    print("=== POST /requests ===")
    print("user_id:", uid)
    print("request_id:", rid)
    print("conversation_id:", cid)
    print("email test:", email)

    r2 = urllib.request.Request(
        f"{BASE}/dashboard/chats",
        headers={"Authorization": f"Bearer {token}"},
    )
    chats = json.loads(urllib.request.urlopen(r2, timeout=30).read().decode())
    print("=== GET /dashboard/chats ===")
    print("count:", len(chats))

    r3 = urllib.request.Request(
        f"{BASE}/dashboard/chats/{cid}",
        headers={"Authorization": f"Bearer {token}"},
    )
    detail = json.loads(urllib.request.urlopen(r3, timeout=30).read().decode())
    print("=== GET /dashboard/chats/{id} ===")
    print("messages:", len(detail["messages"]))
    for m in detail["messages"]:
        role = m.get("sender_role")
        b = (m.get("body") or "")[:100]
        print(f"  [{role}] {b}")

    post = urllib.request.Request(
        f"{BASE}/dashboard/chats/{cid}/messages",
        data=json.dumps(
            {"body": "Messaggio di prova: continuo il flusso da loggato."}
        ).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST",
    )
    urllib.request.urlopen(post, timeout=30)
    r4 = urllib.request.Request(
        f"{BASE}/dashboard/chats/{cid}",
        headers={"Authorization": f"Bearer {token}"},
    )
    detail2 = json.loads(urllib.request.urlopen(r4, timeout=30).read().decode())
    print("=== dopo POST messaggio utente ===")
    print("messages:", len(detail2["messages"]))
    last = detail2["messages"][-1]
    print("ultimo sender:", last.get("sender_role"), "body:", (last.get("body") or "")[:80])

    path_ids = "/tmp/e2e_ids.txt"
    with open(path_ids, "w", encoding="utf-8") as f:
        f.write(f"{uid}\n{rid}\n{cid}\n{email}\n")
    print("ids salvati in", path_ids)


if __name__ == "__main__":
    main()
