"""Aggiunge specialists.import_batch (tracciamento ondate import, non esposto in API pubbliche)."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0010_specialist_import_batch"
down_revision = "0009_specialist_website_url"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "specialists",
        sa.Column("import_batch", sa.String(length=64), nullable=True),
    )
    op.create_index("ix_specialists_import_batch", "specialists", ["import_batch"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_specialists_import_batch", table_name="specialists")
    op.drop_column("specialists", "import_batch")
