"""POST /requests con email seomantis@gmail.com (accettato da Resend in test)."""
from __future__ import annotations

import json
import urllib.request

BASE = "http://127.0.0.1:8060"
body = {
    "email": "seomantis@gmail.com",
    "first_name": "Admin",
    "last_name": "TestResend",
    "phone": "+393204864478",
    "city": "Lecce",
    "province": "LE",
    "animal": {"species": "cane", "name": "Neo"},
    "service": "visita_generica",
    "urgency": "alta",
    "description": "Verifica invio email Resend verso stesso account",
    "email_verification_ack": True,
    "registration_consent": True,
    "password": "ResendTest123456!",
}
req = urllib.request.Request(
    f"{BASE}/requests",
    data=json.dumps(body).encode(),
    headers={"Content-Type": "application/json"},
)
print(urllib.request.urlopen(req, timeout=60).read().decode()[:800])
