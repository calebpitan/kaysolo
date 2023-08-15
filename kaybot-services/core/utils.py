import pytz
from datetime import datetime


def get_utc_time():
    """Get the current UTC time with timezone information"""
    return datetime.now(tz=pytz.utc)


def create_error(message: str):
    return {"message": message}
