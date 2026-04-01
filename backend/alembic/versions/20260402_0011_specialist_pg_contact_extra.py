"""Aggiunge phone_fixed, phone_mobile, contact_email, opening_hours su specialists (dati scheda PG)."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0011_specialist_pg_contact_extra"
down_revision = "0010_specialist_import_batch"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("specialists", sa.Column("phone_fixed", sa.String(length=64), nullable=True))
    op.add_column("specialists", sa.Column("phone_mobile", sa.String(length=64), nullable=True))
    op.add_column("specialists", sa.Column("contact_email", sa.String(length=320), nullable=True))
    op.add_column("specialists", sa.Column("opening_hours", sa.Text(), nullable=True))
    op.add_column("specialists", sa.Column("business_description", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("specialists", "business_description")
    op.drop_column("specialists", "opening_hours")
    op.drop_column("specialists", "contact_email")
    op.drop_column("specialists", "phone_mobile")
    op.drop_column("specialists", "phone_fixed")
