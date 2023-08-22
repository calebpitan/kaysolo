from typing import Literal
from fastapi import HTTPException, status

from core.utils import create_error

from .code import ErrorCode


class AppHTTPException(HTTPException):
    message: str
    code: ErrorCode

    def __init__(
        self,
        message: str,
        status_code: int,
        *,
        code: ErrorCode,
        headers: dict[str, str] | None = None,
    ):
        super().__init__(
            status_code=status_code,
            detail=create_error(message=message),
            headers=headers,
        )

        self.message = message
        self.code = code


class BadRequestException(AppHTTPException):
    message: str
    code: Literal[ErrorCode.INVALID_REQUEST]

    def __init__(self, *, message: str, headers: dict[str, str] | None = None):
        super().__init__(
            message,
            status_code=status.HTTP_400_BAD_REQUEST,
            code=ErrorCode.INVALID_REQUEST,
            headers=headers,
        )


class UnauthenticatedException(AppHTTPException):
    message: str
    code: Literal[ErrorCode.UNAUTHENTICATED]

    def __init__(self, *, message: str, headers: dict[str, str] | None = None):
        super().__init__(
            message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            code=ErrorCode.UNAUTHENTICATED,
            headers=headers,
        )


class UnauthorizedException(AppHTTPException):
    message: str
    code: Literal[ErrorCode.UNAUTHORIZED]

    def __init__(self, *, message: str, headers: dict[str, str] | None = None):
        super().__init__(
            message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            code=ErrorCode.UNAUTHORIZED,
            headers=headers,
        )


class ForbiddenRequestException(AppHTTPException):
    message: str
    code: Literal[ErrorCode.FORBIDDEN_REQUEST]

    def __init__(self, *, message: str, headers: dict[str, str] | None = None):
        super().__init__(
            message,
            status_code=status.HTTP_403_FORBIDDEN,
            code=ErrorCode.FORBIDDEN_REQUEST,
            headers=headers,
        )


class NotFoundException(AppHTTPException):
    message: str
    code: Literal[ErrorCode.NOT_FOUND]

    def __init__(self, *, message: str, headers: dict[str, str] | None = None):
        super().__init__(
            message,
            status_code=status.HTTP_404_NOT_FOUND,
            code=ErrorCode.NOT_FOUND,
            headers=headers,
        )


class ServiceUnavailableException(AppHTTPException):
    message: str
    code: Literal[ErrorCode.SERVICE_UNAVAILABLE]

    def __init__(self, *, message: str, headers: dict[str, str] | None = None):
        super().__init__(
            message,
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            code=ErrorCode.SERVICE_UNAVAILABLE,
            headers=headers,
        )
