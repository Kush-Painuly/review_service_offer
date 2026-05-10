from fastapi import APIRouter, HTTPException
from app.schemas.review_schemas import ReviewRequest, ReviewResponse
from app.utils.prompt_builder import build_prompt
from app.services.ai_service import generate_reviews
from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.database import get_db
from app.crud.business_crud import get_business_by_slug

router = APIRouter()


@router.get("/business-config/{business_id}")
async def get_business_config(business_id: str,db: Session = Depends(get_db)):
    business = get_business_by_slug(db, business_id)

    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    return {
        "name": business.business_name,
        "google_review_url": business.google_review_url
}


@router.post("/generate-reviews/{business_id}", response_model=ReviewResponse)
async def generate_reviews_endpoint(business_id: str,
    request: ReviewRequest,
    db: Session = Depends(get_db)):
    try:
        business = get_business_by_slug(db, business_id)

        if not business:
            raise HTTPException(status_code=404, detail="Business not found")

        prompt = build_prompt(request.rating,
    {
        "name": business.business_name,
        "category": business.category,
        "keywords": business.keywords
    })
        reviews = await generate_reviews(prompt)

        if not reviews:
            raise ValueError("Empty response from AI")

        return {"reviews": reviews[:5]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))