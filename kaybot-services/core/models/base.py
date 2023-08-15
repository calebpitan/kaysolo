from sqlalchemy import UUID, Column, DateTime

from core.database.engine import DeclarativeBase
from core.utils import get_utc_time


class Base(DeclarativeBase):
    id = Column(UUID, primary_key=True, index=True)
    created_at = Column(DateTime, index=True, default=get_utc_time())
    updated_at = Column(DateTime, index=True, default=get_utc_time())
    deleted_at = Column(DateTime, index=True, nullable=True, default=None)
