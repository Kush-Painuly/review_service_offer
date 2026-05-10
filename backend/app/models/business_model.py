import uuid
from sqlalchemy import Column, String, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.db.database import Base


class Business(Base):
    __tablename__ = "businesses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    business_slug = Column(String, unique=True, nullable=False)

    business_name = Column(String, nullable=False)

    category = Column(String, nullable=False)

    keywords = Column(JSON, nullable=False)

    google_review_url = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())