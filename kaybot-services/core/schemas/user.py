from pydantic import BaseModel

from .base import SchemaBase


class UserBase(BaseModel):
    first_name: str
    last_name: str
    username: str


class UserCreate(UserBase):
    pass


class User(UserBase, SchemaBase):
    account: "Account"

    class Config:
        orm_mode = True


from .account import Account

User.model_rebuild()
