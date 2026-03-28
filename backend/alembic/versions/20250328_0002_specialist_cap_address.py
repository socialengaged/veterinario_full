"""Aggiunge CAP e indirizzo stradale ai specialisti (tabella email admin, matching zona)."""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

revision = "0002_specialist_cap_address"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    insp = inspect(bind)
    cols = {c["name"] for c in insp.get_columns("specialists")}
    if "cap" not in cols:
        op.add_column("specialists", sa.Column("cap", sa.String(16), nullable=True))
    if "street_address" not in cols:
        op.add_column("specialists", sa.Column("street_address", sa.String(512), nullable=True))
    ix = insp.get_indexes("specialists")
    ix_names = {i["name"] for i in ix}
    if "ix_specialists_cap" not in ix_names:
        op.create_index("ix_specialists_cap", "specialists", ["cap"], unique=False)


def downgrade() -> None:
    bind = op.get_bind()
    insp = inspect(bind)
    ix_names = {i["name"] for i in insp.get_indexes("specialists")}
    if "ix_specialists_cap" in ix_names:
        op.drop_index("ix_specialists_cap", table_name="specialists")
    cols = {c["name"] for c in insp.get_columns("specialists")}
    if "street_address" in cols:
        op.drop_column("specialists", "street_address")
    if "cap" in cols:
        op.drop_column("specialists", "cap")
