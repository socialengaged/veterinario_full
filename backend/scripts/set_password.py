"""Imposta password per utente (login POST /auth/login)."""
from __future__ import annotations

import sys

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.entities import User


def main() -> None:
    if len(sys.argv) != 3:
        print("Uso: python scripts/set_password.py email@dominio.it password")
        sys.exit(1)
    email, pw = sys.argv[1], sys.argv[2]
    db: Session = SessionLocal()
    try:
        u = db.scalar(select(User).where(User.email == email.strip().lower()))
        if not u:
            print("Utente non trovato.")
            sys.exit(1)
        u.hashed_password = hash_password(pw)
        db.commit()
        print("Password aggiornata.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
