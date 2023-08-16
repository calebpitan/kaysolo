from pydantic import UUID4
from sqlalchemy.orm import Session

from core.models import user as model


def get_user_by_id(session: Session, id: UUID4):
    return session.query(model.User).filter(model.User.id == id)


def get_user_by_username(session: Session, username: str):
    return session.query(model.User).filter(model.User.username == username)
