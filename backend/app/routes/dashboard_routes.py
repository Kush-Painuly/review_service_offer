from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.crud.dashboard_crud import (
    get_summary_stats,
    get_rating_distribution
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
async def dashboard_summary(
    db: Session = Depends(get_db)
):

    return get_summary_stats(db)


@router.get("/ratings")
async def dashboard_ratings(
    db: Session = Depends(get_db)
):

    return get_rating_distribution(db)