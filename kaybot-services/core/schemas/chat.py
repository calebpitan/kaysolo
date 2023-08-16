from pydantic import BaseModel


class MessageCreate(BaseModel):
    message_body: str
