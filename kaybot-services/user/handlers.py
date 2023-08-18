from fastapi import Depends
from pydantic import UUID4
from sqlalchemy.orm import Session

from core.deps import get_db
from core.schemas.user import User
from core.services.user import get_user_by_id, get_user_by_username

from .router import router


@router.get("/by_username", response_model=User)
def find_user_by_username(username: str, db: Session = Depends(get_db)):
    user = get_user_by_username(session=db, username=username)

    return user


@router.get("/{id}", response_model=User)
def find_user_by_id(id: UUID4, db: Session = Depends(get_db)):
    user = get_user_by_id(session=db, id=id)

    return user


find_user_by_id.__doc__ = get_user_by_id.__doc__
find_user_by_username.__doc__ = get_user_by_username.__doc__
