from pydantic import BaseModel

class MessageSend(BaseModel):
    message_body: str
