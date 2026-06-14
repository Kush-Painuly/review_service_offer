from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db

from app.schemas.business_schema import (
    BusinessCreate,
    BusinessResponse
)

from app.crud.business_management_crud import (
    create_business,
    get_all_businesses,
    get_business_by_slug,
    delete_business
)

router = APIRouter(
    prefix="/businesses",
    tags=["Businesses"]
)


@router.post(
    "",
    response_model=BusinessResponse
)
async def create_business_route(
    data: BusinessCreate,
    db: Session = Depends(get_db)
):

    return create_business(
        db,
        data
    )


@router.get(
    "",
    response_model=list[BusinessResponse]
)
async def get_businesses_route(
    db: Session = Depends(get_db)
):

    return get_all_businesses(db)


@router.get("/{slug}")
async def get_business_by_slug_route(
    slug: str,
    db: Session = Depends(get_db)
):

    business = get_business_by_slug(
        db,
        slug
    )

    if not business:
        raise HTTPException(
            status_code=404,
            detail="Business not found"
        )

    return {
        "id": str(business.id),
        "name": business.business_name,
        "google_review_url": business.google_review_url,
        "business_slug": business.business_slug
    }


@router.delete("/{business_id}")
async def delete_business_route(
    business_id: UUID,
    db: Session = Depends(get_db)
):

    deleted = delete_business(
        db,
        business_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Business not found"
        )

    return {
        "success": True
    }