from pydantic import BaseModel, constr, validator, Field


class MessageCreate(BaseModel):
    message_body: constr(min_length=1) =  Field(strict=True)

    @validator("message_body")
    def non_empty(cls, v: str):
        if v.strip() == "":
            return None
        return v
