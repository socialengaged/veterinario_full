"""Profilo note utente, specialists.user_id, token merge iscrizione."""
from __future__ import annotations

import sqlalchemy as sa
from alembic import op
from sqlalchemy import inspect
from sqlalchemy.dialects.postgresql import UUID

revision = "0003_profile_specialist_user_merge"
down_revision = "0002_specialist_cap_address"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    insp = inspect(bind)

    user_cols = {c["name"] for c in insp.get_columns("users")}
    if "profile_notes_for_vets" not in user_cols:
        op.add_column("users", sa.Column("profile_notes_for_vets", sa.Text(), nullable=True))
    if "pending_specialist_profile" not in user_cols:
        op.add_column("users", sa.Column("pending_specialist_profile", sa.JSON(), nullable=True))

    spec_cols = {c["name"] for c in insp.get_columns("specialists")}
    if "user_id" not in spec_cols:
        op.add_column(
            "specialists",
            sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        )

    ix = insp.get_indexes("specialists")
    ix_names = {i["name"] for i in ix}
    if "uq_specialists_user_id" not in ix_names:
        # Parziale: più righe con user_id NULL (seed) restano ammesse
        dialect = bind.dialect.name
        if dialect == "postgresql":
            op.execute(
                """
                CREATE UNIQUE INDEX IF NOT EXISTS uq_specialists_user_id
                ON specialists (user_id)
                WHERE user_id IS NOT NULL
                """
            )
        else:
            op.create_index("uq_specialists_user_id", "specialists", ["user_id"], unique=True)

def downgrade() -> None:
    bind = op.get_bind()
    insp = inspect(bind)

    ix = insp.get_indexes("specialists")
    ix_names = {i["name"] for i in ix}
    if "uq_specialists_user_id" in ix_names:
        op.drop_index("uq_specialists_user_id", table_name="specialists")

    spec_cols = {c["name"] for c in insp.get_columns("specialists")}
    if "user_id" in spec_cols:
        op.drop_column("specialists", "user_id")

    user_cols = {c["name"] for c in insp.get_columns("users")}
    if "pending_specialist_profile" in user_cols:
        op.drop_column("users", "pending_specialist_profile")
    if "profile_notes_for_vets" in user_cols:
        op.drop_column("users", "profile_notes_for_vets")
