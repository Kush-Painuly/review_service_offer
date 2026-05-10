import uuid
from sqlalchemy import Column, String, JSON, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.db.database import Base


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    business_id = Column(
        UUID(as_uuid=True),
        ForeignKey("businesses.id"),
        nullable=False
    )

    event_type = Column(String, nullable=False)

    event_metadata = Column(JSON, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())