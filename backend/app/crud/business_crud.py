from sqlalchemy.orm import Session
from app.models.business_model import Business


def get_business_by_slug(db: Session, slug: str):
    return db.query(Business).filter(
        Business.business_slug == slug
    ).first()