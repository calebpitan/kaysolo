from pydantic import UUID4
from sqlalchemy.orm import Session

from core.models import user as model


async def get_user_by_id(db: Session, id: UUID4):
    return db.query(model.User).filter(model.User.id == id)


async def get_user_by_username(db: Session, username: str):
    return db.query(model.Account).filter(model.User.username == username)
