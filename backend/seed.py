from app.db.database import SessionLocal
from app.models.business_model import Business

db = SessionLocal()

existing = db.query(Business).filter(
    Business.business_slug == "abc123"
).first()

if not existing:

    business = Business(
        business_slug="abc123",
        business_name="The Queen's Cafe",
        category="Restaurant",
        keywords=[
            "top-notch quality",
            "cozy ambience",
            "great food",
            "friendly staff"
        ],
        google_review_url="https://g.page/r/XXXXX/review"
    )

    db.add(business)
    db.commit()

    print("Seed business inserted!")

else:
    print("Business already exists.")

db.close()