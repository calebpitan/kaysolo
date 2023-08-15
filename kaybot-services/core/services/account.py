from pydantic import UUID4, EmailStr
from sqlalchemy.orm import Session

from core.models import account as model
from core.schemas import account as schema

from .user import get_user_by_username


async def create_account(db: Session, account: schema.AccountCreate):
    password = account.password
    account = model.Account(email=account.email, password=password, user=account.user)
    db.add(account)
    db.commit()
    db.refresh(account)
    return account


async def get_account_by_id(db: Session, id: UUID4):
    return db.query(model.Account).filter(model.Account.id == id)


async def get_account_by_email(db: Session, email: EmailStr):
    return db.query(model.Account).filter(model.Account.email == email)
