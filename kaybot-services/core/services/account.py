from pydantic import UUID4, EmailStr
from sqlalchemy.orm import Session

from core.models import account as model, user as user_model
from core.schemas import account as schema


async def create_account(db: Session, account: schema.AccountCreate):
    password = account.password
    user = user_model.User(**account.user.model_dump())
    account = model.Account(email=account.email, password=password, user=user)

    db.add(account)
    db.commit()
    db.refresh(account)

    return account


async def get_account_by_id(db: Session, id: UUID4):
    return db.query(model.Account).filter(model.Account.id == id)


async def get_account_by_email(db: Session, email: EmailStr):
    return db.query(model.Account).filter(model.Account.email == email)
