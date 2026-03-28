"""Indici su messages(created_at) e messages(conversation_id, created_at)."""

from __future__ import annotations

from alembic import op

revision = "0004_messages_indexes"
down_revision = "0003_usr_prof_spec"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("CREATE INDEX IF NOT EXISTS ix_messages_created_at ON messages (created_at)")
    op.execute(
        "CREATE INDEX IF NOT EXISTS ix_messages_conversation_created "
        "ON messages (conversation_id, created_at)"
    )


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS ix_messages_conversation_created")
    op.execute("DROP INDEX IF EXISTS ix_messages_created_at")
