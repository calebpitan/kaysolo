from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from core.settings import kaybot_settings as s

DATABASE_URL = f"postgresql://{s.POSTGRES_USER}:{s.POSTGRES_PASSWORD}@{s.POSTGRES_HOST}/{s.APP_CODE_NAME}"

engine = create_engine(DATABASE_URL, echo=True)

DeclarativeBase = declarative_base()
