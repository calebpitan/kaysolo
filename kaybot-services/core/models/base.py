from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime

# from sqlalchemy import UUID
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import MappedAsDataclass

from core.utils import get_utc_time


class Base(MappedAsDataclass, DeclarativeBase):
    id: Mapped[UUID] = mapped_column(
        init=False, primary_key=True, index=True, default_factory=uuid4
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, index=True, default=get_utc_time()
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime, index=True, default=get_utc_time()
    )

    deleted_at: Mapped[datetime] | None = mapped_column(
        DateTime, init=False, index=True, nullable=True, default=None
    )
