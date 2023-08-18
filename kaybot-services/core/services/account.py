from fastapi import HTTPException
from pydantic import UUID4, EmailStr
from sqlalchemy.orm import Session

from core.models import account as model, user as user_model
from core.schemas import account as schema
from core.utils import create_error

from .user import get_user_by_username


def create_account_service(session: Session, credentials: schema.AccountCreate):
    password = credentials.password
    user = user_model.User(**credentials.user.model_dump())
    account = model.Account(email=credentials.email, password=password, user=user)

    existing_account = get_account_by_email(
        session,
        email=credentials.email,
    ).one_or_none()

    existing_user = get_user_by_username(
        session,
        username=credentials.user.username,
    ).one_or_none()

    if existing_account:
        raise HTTPException(
            400,
            create_error(
                message=f"email address [{credentials.email}] is already in use"
            ),
        )

    if existing_user:
        raise HTTPException(
            400,
            create_error(
                message=f"username [{credentials.user.username}] is already in use"
            ),
        )

    session.add(account)
    session.commit()
    session.refresh(account)

    return account


def get_account_by_id(session: Session, id: UUID4):
    return session.query(model.Account).filter(model.Account.id == id)


def get_account_by_email(session: Session, email: EmailStr):
    return session.query(model.Account).filter(model.Account.email == email)
