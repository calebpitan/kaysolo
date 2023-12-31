from typing import TYPE_CHECKING, Optional
from pydantic import UUID4, BaseModel, ConfigDict

from .base import SchemaBase

if TYPE_CHECKING:
    from .account import Account


class UserBase(BaseModel):
    first_name: str
    last_name: str
    username: str


class UserCreate(UserBase):
    pass


class User(UserBase, SchemaBase):
    model_config = ConfigDict(from_attributes=True)

    account_id: UUID4

    # account: Optional["Account"]
