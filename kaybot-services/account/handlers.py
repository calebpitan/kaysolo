from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from core.authentication.token import JWTRS256Token, prefix_sub
from core.deps import get_db, get_current_account
from core.schemas.account import Account, AccountCreate, Token, TokenTypeEnum
from core.services.account import (
    authenticate_user_account_service,
    create_user_account_service,
)

from .router import router


@router.post("/create", response_model=Account)
def create_user_account(credentials: AccountCreate, db: Session = Depends(get_db)):
    account = create_user_account_service(session=db, credentials=credentials)

    return account


@router.post("/authenticate", response_model=Token)
def authenticate_user_account(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    account = authenticate_user_account_service(
        db,
        identifier=form_data.username,
        password=form_data.password,
    )

    access_token = JWTRS256Token.from_data(data={"sub": prefix_sub(account.id.hex)})

    return Token(access_token=access_token, token_type=TokenTypeEnum.BEARER)


@router.get("/me", response_model=Account)
def identify_user_account(
    current_account: Annotated[Account, Depends(get_current_account)]
):
    """Identify the current user and return the user account"""

    return current_account
