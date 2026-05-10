from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.analytics_schema import AnalyticsRequest

from app.crud.business_crud import get_business_by_slug
from app.crud.analytics_crud import create_analytics_event

router = APIRouter()


@router.post("/analytics")
async def track_analytics(
    request: AnalyticsRequest,
    db: Session = Depends(get_db)
):

    business = get_business_by_slug(
        db,
        request.business_slug
    )

    if not business:
        raise HTTPException(
            status_code=404,
            detail="Business not found"
        )

    create_analytics_event(
        db=db,
        business_id=business.id,
        event_type=request.event_type,
        event_metadata=request.metadata
    )

    return {
        "success": True
    }