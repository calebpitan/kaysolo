from sqlalchemy import Column, String, DateTime, Index
from sqlalchemy.dialects.postgresql import CITEXT
from sqlalchemy.orm import relationship

from core.utils import get_utc_time

from .base import ModelBase


class Account(ModelBase):
    """The user account: this will mostly just be used
    to store credentials and authentication data and other
    user account related stuff
    """

    __tablename__ = "acccount"

    email = Column(CITEXT)
    password = Column(String)
    active_at = Column(DateTime, default=get_utc_time())
    verified_at = Column(DateTime, nullable=True, default=None)

    user = relationship("User", back_populates="account")

    # partial index: useful for soft delete
    __table_args__ = Index(
        "IDX_Account_email_UNIQUE",
        email,
        unique=True,
        postgresql_where=ModelBase.deleted_at.is_(None),
    )
