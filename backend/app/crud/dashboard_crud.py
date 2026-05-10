from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy import func, cast, String

from app.models.analytics_model import AnalyticsEvent


def get_summary_stats(db: Session):

    total_scans = db.query(AnalyticsEvent).filter(
        AnalyticsEvent.event_type == "qr_scan"
    ).count()

    total_reviews = db.query(AnalyticsEvent).filter(
        AnalyticsEvent.event_type == "review_generated"
    ).count()

    total_redirects = db.query(AnalyticsEvent).filter(
        AnalyticsEvent.event_type == "google_redirect"
    ).count()

    conversion_rate = 0

    if total_scans > 0:
        conversion_rate = round(
            (total_reviews / total_scans) * 100,
            2
        )

    return {
        "total_scans": total_scans,
        "total_reviews": total_reviews,
        "total_redirects": total_redirects,
        "conversion_rate": conversion_rate
    }


def get_rating_distribution(db: Session):

    results = db.query(
        cast(
            AnalyticsEvent.event_metadata["rating"],
            String
        ),
        func.count()
    ).filter(
        AnalyticsEvent.event_type == "review_generated"
    ).group_by(
        cast(
            AnalyticsEvent.event_metadata["rating"],
            String
        )
    ).all()

    distribution = []

    for rating, count in results:
        distribution.append({
            "rating": rating.replace('"', ''),
            "count": count
        })

    return distribution