"""Eseguito dalla root del backend: verifica invio email (Resend o SMTP)."""
from __future__ import annotations

import sys
from pathlib import Path

_backend = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_backend))

from app.services.email_service import EmailService  # noqa: E402


def main() -> None:
    try:
        EmailService().send_test_ping()
    except Exception as e:
        print("ERRORE:", e, file=sys.stderr)
        sys.exit(1)
    print("OK: email inviata (controlla inbox e spam).")


if __name__ == "__main__":
    main()
