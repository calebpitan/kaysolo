from sqlalchemy import Column, String, Index
from sqlalchemy.dialects.postgresql import CITEXT
from sqlalchemy.orm import relationship

from .base import Base
from core.utils import get_utc_time


class User(Base):
    """The account user: this will mostly just be used
    to store information about the user like name, age,
    address, etc.
    """

    __tablename__ = "user"

    first_name = Column(String)
    last_name = Column(String)
    username = Column(CITEXT)
    password = Column(String)

    account = relationship("Account", back_populates="user")

    # partial index: useful for soft delete
    __table_args__ = Index(
        "IDX_User_username_UNIQUE",
        username,
        unique=True,
        postgresql_where=Base.deleted_at.is_(None),
    )
