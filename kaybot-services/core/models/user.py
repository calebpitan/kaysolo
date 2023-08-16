from typing import TYPE_CHECKING
from sqlalchemy import String, Index
from sqlalchemy.dialects.postgresql import CITEXT
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.orm import Mapped

from .base import Base

if TYPE_CHECKING:
    from .account import Account


class User(Base):
    """The account user: this will mostly just be used
    to store information about the user like name, age,
    address, etc.
    """

    __tablename__ = "user"

    first_name: Mapped[str] = mapped_column(String)
    last_name: Mapped[str] = mapped_column(String)
    username: Mapped[str] = mapped_column(CITEXT)

    account: Mapped["Account"] = relationship("Account", back_populates="user", init=False)

    # partial index: useful for soft delete
    __table_args__ = (
        Index(
            "IDX_User_username_UNIQUE",
            username,
            unique=True,
            postgresql_where=Base.deleted_at.is_(None),
        ),
    )
