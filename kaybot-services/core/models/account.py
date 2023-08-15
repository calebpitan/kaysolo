from datetime import datetime
from typing import TYPE_CHECKING


from sqlalchemy import String, DateTime, Index
from sqlalchemy.dialects.postgresql import CITEXT
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.orm import Mapped

from core.utils import get_utc_time

from .base import Base

if TYPE_CHECKING:
    from .user import User


class Account(Base):
    """The user account: this will mostly just be used
    to store credentials and authentication data and other
    user account related stuff
    """

    __tablename__ = "acccount"

    email: Mapped[str] = mapped_column(CITEXT, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    active_at: Mapped[datetime] = mapped_column(DateTime, default=get_utc_time())
    verified_at: Mapped[datetime] = mapped_column(DateTime, nullable=True, default=None)

    user: Mapped["User"] = relationship("User", back_populates="account", cascade="all")

    # partial index: useful for soft delete
    __table_args__ = Index(
        "IDX_Account_email_UNIQUE",
        email,
        unique=True,
        postgresql_where=Base.deleted_at.is_(None),
    )
