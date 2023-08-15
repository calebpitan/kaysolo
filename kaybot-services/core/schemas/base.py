from datetime import datetime
from pydantic import BaseModel, UUID4


class SchemaBase(BaseModel):
    id: UUID4
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None
