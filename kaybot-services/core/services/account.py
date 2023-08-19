from fastapi import HTTPException, status
from pydantic import UUID4, EmailStr
from sqlalchemy.orm import Session

from core.authentication.password import Password
from core.models import account as model, user as user_model
from core.schemas import account as schema
from core.utils import create_error

from .user import get_user_by_username


def create_user_account_service(session: Session, credentials: schema.AccountCreate):
    """Create a user account that will be used for authentication and will serve
    as the user's identification through the entire system

    :param session: the database session to use to create a new account

    :param credentials: the credentials or data to use to create a new account

    :raises HTTPException:
        - if account with email already exists or,
        - if user with username already exists
    """

    password = Password(credentials.password)
    hashed_password = password.get_hash()

    user = user_model.User(**credentials.user.model_dump())
    account = model.Account(
        email=credentials.email,
        password=hashed_password,
        user=user,
    )

    existing_account: model.Account | None = None
    existing_user: user_model.User | None = None

    try:
        existing_account = get_account_by_email(
            session,
            email=credentials.email,
        )

        existing_user = get_user_by_username(
            session,
            username=credentials.user.username,
        )
    except HTTPException:
        pass

    if not existing_account is None:
        raise HTTPException(
            400,
            create_error(
                message=f"email address [{credentials.email}] is already in use"
            ),
        )

    if not existing_user is None:
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


def authenticate_user_account_service(session: Session, identifier: str, password: str):
    """Authenticate a user using an identifier (in this case an email address only)
    and a password.

    :param session: the database session to use to create a new account

    :param identifier: the user account email address used to retrieve the account

    :param password: the plain text user account password used to confirm access integrity

    :raises HTTPException:
        - when an account with the identifier or email couldn't be found or,
        - when the plain password supplied doesn't match the hashed password stored.
    """

    account = get_account_by_email(session, email=identifier)
    password_object = Password(plain_password=password)

    if not password_object.compare(hashed_password=account.password):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail=create_error(message=f"an incorrect password was supplied"),
        )

    return account


def get_account_by_id(session: Session, id: UUID4):
    """Get a user account by the account ID

    :param session: the database session to use to create a new account

    :param id: the user account id to use to retrieve the account

    :raises HTTPException:
        if account with the specified id couldn't be found
    """

    account = session.query(model.Account).filter(model.Account.id == id).one_or_none()

    if account is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=create_error(message=f"account with id [{id}] not found"),
        )

    return account


def get_account_by_email(session: Session, email: EmailStr):
    """Get a user account by the account email address

    :param session: the database session to use to create a new account

    :param email: the user account email address to use to retrieve the account

    :raises HTTPException:
        if account with the specified email address couldn't be found
    """

    account = (
        session.query(model.Account).filter(model.Account.email == email).one_or_none()
    )

    if account is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=create_error(
                message=f"account with email address [{email}] not found"
            ),
        )

    return account
