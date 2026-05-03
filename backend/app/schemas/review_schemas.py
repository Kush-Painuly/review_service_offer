from pydantic import BaseModel, Field

class ReviewRequest(BaseModel):
    rating: int = Field(..., ge=1, le=5)

class ReviewResponse(BaseModel):
    reviews: list[str]