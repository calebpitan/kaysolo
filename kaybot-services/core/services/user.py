from fastapi import HTTPException, status
from pydantic import UUID4
from sqlalchemy.orm import Session

from core.models import user as model
from core.utils import create_error


def get_user_by_id(session: Session, id: UUID4):
    """Find a user by ID

    :param session: the database session to use
    :param id: the unique user identifier to use to retrieve the user

    Raises:
        HTTPException when no user is found
    """

    user = session.query(model.User).filter(model.User.id == id).one_or_none()

    if not user:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=create_error(message=f"user with ID [{id}] not found"),
        )

    return user


def get_user_by_username(session: Session, username: str):
    """Find a user by username

    :param session: the database session to use
    :param username: the unique username to use to retrieve the user

    Raises:
        HTTPException when no user is found
    """

    user = (
        session.query(model.User).filter(model.User.username == username).one_or_none()
    )

    if not user:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=create_error(message=f"user with username [{username}] not found"),
        )

    return user
