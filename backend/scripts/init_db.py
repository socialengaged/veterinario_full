"""Solo sviluppo locale: crea tabelle da metadata. In produzione usare Alembic."""
from __future__ import annotations

from app.db.base import Base
from app.db.session import engine
import app.models.entities  # noqa: F401


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("OK: tabelle create (dev).")


if __name__ == "__main__":
    main()
