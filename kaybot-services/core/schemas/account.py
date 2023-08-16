from datetime import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, EmailStr

from .base import SchemaBase
from .user import UserCreate

if TYPE_CHECKING:
    from .user import User


class AccountBase(BaseModel):
    email: EmailStr


class AccountCreate(AccountBase):
    password: str
    user: UserCreate


class Account(AccountBase, SchemaBase):
    model_config = ConfigDict(from_attributes=True)

    active_at: datetime
    verified_at: datetime | None
    user: "User"
