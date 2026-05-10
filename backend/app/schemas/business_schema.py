from pydantic import BaseModel


class BusinessCreate(BaseModel):
    business_name: str
    category: str
    keywords: str
    google_review_url: str
    slug: str


class BusinessResponse(BaseModel):
    id: int
    business_name: str
    category: str
    keywords: str
    google_review_url: str
    slug: str

    class Config:
        from_attributes = True