from fastapi import Depends
from sqlalchemy.orm import Session

from core.database.session import get_db
from core.schemas.account import Account, AccountCreate
from core.services.account import create_account_service

from .router import router


@router.post("/create", response_model=Account)
def create_account(credentials: AccountCreate, db: Session = Depends(get_db)):
    """Create a user account that will be used for authentication and will serve
    as the user's identification through the entire system
    """

    return create_account_service(session=db, credentials=credentials)
