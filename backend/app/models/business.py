from sqlalchemy import Column, Integer, String

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    slug = Column(
        String,
        unique=True,
        nullable=False
    )