from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

class JournalCreate(BaseModel):
    content: str
    user_id: str
    class Config:
        orm_mode = True

class Journal(BaseModel):
    id: int
    content: str
    user_id: str
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        orm_mode = True

