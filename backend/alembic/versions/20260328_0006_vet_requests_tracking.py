"""vet_requests: conversion tracking (source_page, UTM, user_agent, ip_address)."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0006_vet_requests_tracking"
down_revision = "0005_hardening_email_logs"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("vet_requests", sa.Column("source_page", sa.Text(), nullable=True))
    op.add_column("vet_requests", sa.Column("utm_source", sa.Text(), nullable=True))
    op.add_column("vet_requests", sa.Column("utm_medium", sa.Text(), nullable=True))
    op.add_column("vet_requests", sa.Column("utm_campaign", sa.Text(), nullable=True))
    op.add_column("vet_requests", sa.Column("user_agent", sa.Text(), nullable=True))
    op.add_column("vet_requests", sa.Column("ip_address", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("vet_requests", "ip_address")
    op.drop_column("vet_requests", "user_agent")
    op.drop_column("vet_requests", "utm_campaign")
    op.drop_column("vet_requests", "utm_medium")
    op.drop_column("vet_requests", "utm_source")
    op.drop_column("vet_requests", "source_page")
