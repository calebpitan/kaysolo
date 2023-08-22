from pydantic import UUID4
from sqlalchemy.orm import Session

from core.exceptions.http import NotFoundException
from core.models import user as model


def get_user_by_id(session: Session, id: UUID4):
    """Find a user by ID

    :param session: the database session to use
    :param id: the unique user identifier to use to retrieve the user

    :raises NotFoundException:
        if no user with the specified identifier or ID is found
    """

    user = session.query(model.User).filter(model.User.id == id).one_or_none()

    if not user:
        raise NotFoundException(message=f"user with ID [{id}] not found")

    return user


def get_user_by_username(session: Session, username: str):
    """Find a user by username

    :param session: the database session to use
    :param username: the unique username to use to retrieve the user

    :raises NotFoundException:
        if no user that goes by a username is found
    """

    user = (
        session.query(model.User).filter(model.User.username == username).one_or_none()
    )

    if not user:
        raise NotFoundException(message=f"user with username [{username}] not found")

    return user
