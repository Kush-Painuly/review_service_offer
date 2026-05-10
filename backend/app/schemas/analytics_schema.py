from pydantic import BaseModel
from typing import Optional


class AnalyticsRequest(BaseModel):
    business_slug: str
    event_type: str
    metadata: Optional[dict] = None