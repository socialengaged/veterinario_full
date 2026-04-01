#!/usr/bin/env python3
"""Aggiunge chiavi email mancanti al .env (non sovrascrive valori esistenti)."""
from __future__ import annotations

from pathlib import Path

ENV_PATH = Path("/var/www/veterinari/backend/.env")

DEFAULTS: dict[str, str] = {
    "ADMIN_EMAIL_CC": "vet.stella@gmail.com",
    "SMTP_HOST": "smtp.gmail.com",
    "SMTP_PORT": "587",
    "SMTP_USER": "seomantis@gmail.com",
    "SMTP_PASSWORD": "",
    "SMTP_FROM": "seomantis@gmail.com",
    "SMTP_USE_TLS": "true",
}


def main() -> None:
    lines = ENV_PATH.read_text(encoding="utf-8").splitlines() if ENV_PATH.exists() else []
    keys: dict[str, str] = {}
    order: list[str] = []
    for line in lines:
        s = line.strip()
        if not s or s.startswith("#") or "=" not in s:
            continue
        k, _, v = s.partition("=")
        k = k.strip()
        if k not in keys:
            order.append(k)
        keys[k] = v

    for k, v in DEFAULTS.items():
        if k not in keys:
            keys[k] = v
            order.append(k)

    ENV_PATH.write_text("\n".join(f"{k}={keys[k]}" for k in order) + "\n", encoding="utf-8")
    print("OK merge:", ENV_PATH)


if __name__ == "__main__":
    main()
