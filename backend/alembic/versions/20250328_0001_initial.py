"""Revisione iniziale: crea tutte le tabelle da SQLAlchemy metadata.

In ambienti con requisiti di review DBA, sostituire con revisioni autogenerate esplicite.
"""
from __future__ import annotations

from alembic import op

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    from app.db.base import Base
    import app.models.entities  # noqa: F401

    Base.metadata.create_all(bind=bind)


def downgrade() -> None:
    bind = op.get_bind()
    from app.db.base import Base
    import app.models.entities  # noqa: F401

    Base.metadata.drop_all(bind=bind)
