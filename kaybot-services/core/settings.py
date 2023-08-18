from pydantic.v1 import BaseSettings
from typing import Any
from decouple import config


class Settings(BaseSettings):
    """Base configurations for the kaybot-services application"""

    APP_NAME: str = config("APP_NAME", cast=str)
    APP_CODE_NAME: str = config("APP_CODE_NAME", cast=str)
    PORT: int = config("PORT", cast=int)

    DESCRIPTION: str = "KayBot is a chatbot that can be utilized for lead generation in the field of digital marketing."

    CLIENT_ADDRESSES: list[str] | Any = config("CLIENT_ADDRESSES", cast=str).split(",")

    JWT_RS256_PUB_KEY: str = config("JWT_RS256_PUB_KEY", cast=str)
    JWT_RS256_KEY: str = config("JWT_RS256_KEY", cast=str)
    TOKEN_EXPIRY: str = config("TOKEN_EXPIRY", cast=str)

    VERSION: str = "1.0"

    POSTGRES_PORT: int = config("POSTGRES_PORT", cast=int)
    POSTGRES_HOST: str = config("POSTGRES_HOST", cast=str)
    POSTGRES_USER: str = config("POSTGRES_USER", cast=str)
    POSTGRES_PASSWORD: str = config("POSTGRES_PASSWORD", cast=str)

    OPENAI_SECRET_KEY: str = config("OPENAI_SECRET_KEY", cast=str)


settings = Settings()
