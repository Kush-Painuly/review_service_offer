from pydantic import BaseModel
from typing import List
from uuid import UUID
from datetime import datetime


class BusinessCreate(BaseModel):
    business_name: str
    category: str
    keywords: List[str]
    google_review_url: str
    slug: str


class BusinessResponse(BaseModel):
    id: UUID
    business_name: str
    category: str
    keywords: List[str]
    google_review_url: str
    business_slug: str
    created_at: datetime

    class Config:
        from_attributes = True