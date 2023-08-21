from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Optional

from pydantic import UUID4, BaseModel, ConfigDict, EmailStr, Field

from core.authentication.token import JWTRS256Token

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


class TokenData(BaseModel):
    account_id: UUID4 | None


class TokenTypeEnum(str, Enum):
    BEARER = "Bearer"


class Token(BaseModel):
    access_token: JWTRS256Token = Field(json_schema_extra={"type": "string"})
    refresh_token: JWTRS256Token = Field(json_schema_extra={"type": "string"})
    token_type: TokenTypeEnum
