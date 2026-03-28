#!/usr/bin/env python3
"""E2E: inbox temporanea (mail.tm) + POST /requests + verifica email + login + messaggio chat.

Richiede: `httpx` (già in requirements.txt).

Esempi:
  cd backend && python scripts/e2e_temp_mail_flow.py --runs 2
  python scripts/e2e_temp_mail_flow.py --api-base https://api.veterinariovicino.it --runs 3

Usa l'API pubblica https://api.mail.tm (nessuna API key).
"""
from __future__ import annotations

import argparse
import re
import sys
import time
import uuid

import httpx

MAIL_TM = "https://api.mail.tm"


def _get_domain(client: httpx.Client) -> str:
    r = client.get(f"{MAIL_TM}/domains")
    r.raise_for_status()
    data = r.json()
    members = data.get("hydra:member") or []
    if not members:
        raise RuntimeError("mail.tm: nessun dominio disponibile")
    return str(members[0]["domain"])


def _create_mail_tm_session(client: httpx.Client) -> tuple[str, str]:
    """Restituisce (indirizzo email, bearer token API mail.tm)."""
    domain = _get_domain(client)
    local = f"vv{uuid.uuid4().hex[:14]}"
    address = f"{local}@{domain}"
    mt_password = uuid.uuid4().hex + "Aa1!"
    for attempt in range(6):
        r = client.post(f"{MAIL_TM}/accounts", json={"address": address, "password": mt_password})
        if r.status_code == 429:
            time.sleep(15 * (attempt + 1))
            continue
        r.raise_for_status()
        break
    else:
        raise RuntimeError("mail.tm: troppi 429 sulla creazione account — riprova tra qualche minuto")
    r2 = client.post(f"{MAIL_TM}/token", json={"address": address, "password": mt_password})
    r2.raise_for_status()
    token = r2.json()["token"]
    return address, token


def _as_text(x: object) -> str:
    if x is None:
        return ""
    if isinstance(x, list):
        return "\n".join(_as_text(i) for i in x)
    return str(x)


def _extract_verify_token(blob: str) -> str:
    blob = blob.replace("&amp;", "&")
    m = re.search(r"verify-email\?token=([^&\s\"'<>]+)", blob)
    if m:
        return m.group(1)
    m2 = re.search(r"[?&]token=([^&\s\"'<>]+)", blob)
    if m2:
        return m2.group(1)
    raise RuntimeError(f"Token di verifica non trovato nel corpo email (anteprima: {blob[:400]!r})")


def _wait_for_verify_token(client: httpx.Client, mail_bearer: str, timeout: float = 150.0) -> str:
    headers = {"Authorization": f"Bearer {mail_bearer}"}
    deadline = time.time() + timeout
    while time.time() < deadline:
        r = client.get(f"{MAIL_TM}/messages", headers=headers)
        r.raise_for_status()
        members = r.json().get("hydra:member") or []
        if members:
            m0 = members[0]
            mid = m0.get("id")
            if not mid and m0.get("@id"):
                mid = str(m0["@id"]).split("/")[-1]
            r2 = client.get(f"{MAIL_TM}/messages/{mid}", headers=headers)
            r2.raise_for_status()
            body = r2.json()
            parts = [
                _as_text(body.get("html")),
                _as_text(body.get("text")),
                _as_text(body.get("intro")),
            ]
            blob = "\n".join(parts)
            return _extract_verify_token(blob)
        time.sleep(3)
    raise TimeoutError(f"Nessuna email ricevuta su mail.tm entro {timeout}s")


def _run_once(
    api_base: str,
    vv_password: str,
    *,
    city: str,
    province: str,
    cap: str,
    animal_species: str,
) -> None:
    api_base = api_base.rstrip("/")
    with httpx.Client(timeout=90.0) as client:
        address, mail_bearer = _create_mail_tm_session(client)
        print(f"  Inbox temporanea: {address}")

        payload = {
            "email": address,
            "full_name": "E2E Temp Mail",
            "city": city,
            "province": province,
            "cap": cap,
            "animal_species": animal_species,
            "service": "visita_generica",
            "email_verification_ack": True,
            "registration_consent": True,
            "marketing_consent": False,
            "password": vv_password,
            "description": "Test automatizzato e2e_temp_mail_flow.py",
            "source_page": "/richiedi-assistenza/",
            "utm_source": "e2e",
            "utm_medium": "script",
            "utm_campaign": "temp_mail",
        }
        r = client.post(f"{api_base}/requests", json=payload)
        print(f"  POST /requests -> {r.status_code}")
        if r.status_code != 200:
            print(r.text)
        r.raise_for_status()
        data = r.json()
        conv_id = data["conversation_id"]
        print(f"  conversation_id: {conv_id}")
        if data.get("warning"):
            print(f"  API warning: {data['warning']}")
        if data.get("warning") and "email_not_sent" in data["warning"]:
            raise RuntimeError(
                "Email di verifica non inviata (warning email_not_sent); controlla SMTP e email_logs sul server."
            )

        raw_tok = _wait_for_verify_token(client, mail_bearer)
        print("  Token letto dalla email di verifica")

        r = client.post(f"{api_base}/auth/verify-email", json={"token": raw_tok})
        print(f"  POST /auth/verify-email -> {r.status_code}")
        if r.status_code != 200:
            print(r.text)
        r.raise_for_status()

        r = client.post(f"{api_base}/auth/login", json={"email": address, "password": vv_password})
        print(f"  POST /auth/login -> {r.status_code}")
        if r.status_code != 200:
            print(r.text)
        r.raise_for_status()
        jwt = r.json()["access_token"]
        h = {"Authorization": f"Bearer {jwt}"}

        r = client.get(f"{api_base}/dashboard/chats", headers=h)
        print(f"  GET /dashboard/chats -> {r.status_code}")
        r.raise_for_status()

        r = client.post(
            f"{api_base}/dashboard/chats/{conv_id}/messages",
            headers=h,
            json={"body": "Messaggio test E2E (mail.tm)"},
        )
        print(f"  POST .../chats/{{id}}/messages -> {r.status_code}")
        if r.status_code != 200:
            print(r.text)
        r.raise_for_status()
        print("  OK: flusso completo riuscito.")


def main() -> int:
    ap = argparse.ArgumentParser(description="E2E con mail.tm")
    ap.add_argument("--api-base", default="https://api.veterinariovicino.it", help="Base URL API VeterinarioVicino")
    ap.add_argument("--runs", type=int, default=2, help="Quante volte ripetere il flusso (email diverse)")
    ap.add_argument(
        "--password",
        default="E2ETempMailTest123!",
        help="Password account sul sito (min 8 caratteri)",
    )
    ap.add_argument("--city", default="Lecce", help="Città richiesta (matching)")
    ap.add_argument("--province", default="LE", help="Provincia (sigla)")
    ap.add_argument("--cap", default="73100", help="CAP utente")
    ap.add_argument(
        "--animal-species",
        default="cane",
        help="Specie animale (es. cane, gatto)",
    )
    args = ap.parse_args()
    if args.runs < 1:
        print("--runs deve essere >= 1", file=sys.stderr)
        return 2
    for i in range(args.runs):
        print(f"\n=== Run {i + 1}/{args.runs} ===")
        try:
            _run_once(
                args.api_base,
                args.password,
                city=args.city,
                province=args.province,
                cap=args.cap,
                animal_species=args.animal_species,
            )
        except Exception as e:
            print(f"  ERRORE: {e}", file=sys.stderr)
            return 1
        if i + 1 < args.runs:
            time.sleep(18)
    print("\nTutti i run completati.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
