"""Specialist contact stats + request_matches contacted/outcome."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0008_contact_tracking_priority"
down_revision = "0007_step6_analytics_quality"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "specialists",
        sa.Column("last_contacted_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.add_column(
        "specialists",
        sa.Column("contact_success_count", sa.Integer(), nullable=False, server_default="0"),
    )
    op.add_column(
        "specialists",
        sa.Column("contact_attempts", sa.Integer(), nullable=False, server_default="0"),
    )
    op.add_column(
        "request_matches",
        sa.Column("contacted", sa.Boolean(), nullable=False, server_default=sa.text("false")),
    )
    op.add_column(
        "request_matches",
        sa.Column("contacted_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.add_column(
        "request_matches",
        sa.Column("outcome", sa.Text(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("request_matches", "outcome")
    op.drop_column("request_matches", "contacted_at")
    op.drop_column("request_matches", "contacted")
    op.drop_column("specialists", "contact_attempts")
    op.drop_column("specialists", "contact_success_count")
    op.drop_column("specialists", "last_contacted_at")
