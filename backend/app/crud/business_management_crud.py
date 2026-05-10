from sqlalchemy.orm import Session

from app.models.business_model import Business


def create_business(db: Session, data):

    business = Business(
        business_name=data.business_name,
        category=data.category,
        keywords=data.keywords,
        google_review_url=data.google_review_url,
        slug=data.slug
    )

    db.add(business)
    db.commit()
    db.refresh(business)

    return business


def get_all_businesses(db: Session):

    return db.query(Business).all()


def delete_business(db: Session, business_id: int):

    business = db.query(Business).filter(
        Business.id == business_id
    ).first()

    if not business:
        return None

    db.delete(business)
    db.commit()

    return business