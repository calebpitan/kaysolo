from datetime import datetime
from typing import TYPE_CHECKING, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, ValidationError, field_validator
from sqlalchemy import inspect

from core.utils import (
    is_recursion_validation_error,
    suppress_recursion_validation_error,
)

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
    user: Optional["User"]

    # @field_validator("user", mode="before")
    # @classmethod
    # def drop_cyclic_references(cls, user):
    #     from ..models.user import User

    #     if not (isinstance(user, User)):
    #         return user

    #     new_user = User(
    #         first_name=user.first_name,
    #         last_name=user.last_name,
    #         username=user.username,
    #     )

    #     mapper = inspect(User)

    #     for column in mapper.attrs:
    #         if column.key == "account":
    #             continue
    #         setattr(new_user, column.key, getattr(user, column.key))

    #     return new_user
