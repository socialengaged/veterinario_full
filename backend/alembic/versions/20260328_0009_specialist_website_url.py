"""Aggiunge specialists.website_url (da dataset / scraping)."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0009_specialist_website_url"
down_revision = "0008_contact_tracking_priority"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "specialists",
        sa.Column("website_url", sa.String(length=2048), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("specialists", "website_url")
