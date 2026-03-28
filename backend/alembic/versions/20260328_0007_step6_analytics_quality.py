"""quality_score, request_city, email_logs.log_metadata, indexes."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0007_step6_analytics_quality"
down_revision = "0006_vet_requests_tracking"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("vet_requests", sa.Column("quality_score", sa.Integer(), nullable=False, server_default="0"))
    op.add_column("vet_requests", sa.Column("city", sa.String(128), nullable=True))
    op.add_column("email_logs", sa.Column("log_metadata", sa.Text(), nullable=True))
    op.execute(
        """
        UPDATE vet_requests AS vr
        SET city = ua.city
        FROM user_addresses AS ua
        WHERE ua.id = vr.address_id AND (vr.city IS NULL OR vr.city = '')
        """
    )
    op.create_index("idx_vet_requests_city", "vet_requests", ["city"])
    op.create_index("idx_vet_requests_created_at", "vet_requests", ["created_at"])
    op.create_index("idx_vet_requests_utm_source", "vet_requests", ["utm_source"])


def downgrade() -> None:
    op.drop_index("idx_vet_requests_utm_source", table_name="vet_requests")
    op.drop_index("idx_vet_requests_created_at", table_name="vet_requests")
    op.drop_index("idx_vet_requests_city", table_name="vet_requests")
    op.drop_column("email_logs", "log_metadata")
    op.drop_column("vet_requests", "city")
    op.drop_column("vet_requests", "quality_score")
