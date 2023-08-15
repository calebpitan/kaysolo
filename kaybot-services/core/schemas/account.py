from datetime import datetime
from pydantic import BaseModel, EmailStr

from .base import SchemaBase
from .user import UserCreate


class AccountBase(BaseModel):
    email: EmailStr


class AccountCreate(AccountBase):
    password: str
    user: UserCreate


class Account(AccountBase, SchemaBase):
    active_at: datetime
    verified_at: datetime
    user: "User"

    class Config:
        orm_mode = True


from .user import User

Account.model_rebuild()
