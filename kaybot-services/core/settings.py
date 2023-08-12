from pydantic.v1 import BaseSettings
from decouple import config


class Settings(BaseSettings):
    """Base configurations for the kaybot-services application"""

    APP_NAME: str = config("APP_NAME", cast=str)
    APP_CODE_NAME: str = config("APP_CODE_NAME", cast=str)
    PORT: int = config("PORT", cast=int)

    DESCRIPTION: str = "KayBot is a chatbot that can be utilized for lead generation in the field of digital marketing."

    JWT_RS256_PUB_KEY: str = config("JWT_RS256_PUB_KEY", cast=str)
    JWT_RS256_KEY: str = config("JWT_RS256_KEY", cast=str)
    TOKEN_EXPIRY: str = config("TOKEN_EXPIRY", cast=str)

    VERSION: float = 1.0


kaybot_settings = Settings()
