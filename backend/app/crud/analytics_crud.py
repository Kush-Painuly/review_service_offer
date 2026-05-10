from sqlalchemy.orm import Session

from app.models.analytics_model import AnalyticsEvent


def create_analytics_event(
    db: Session,
    business_id,
    event_type: str,
    event_metadata=None
):

    event = AnalyticsEvent(
        business_id=business_id,
        event_type=event_type,
        event_metadata=event_metadata
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event