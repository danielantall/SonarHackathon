from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class Habit(BaseModel):
    id: Optional[str]
    user_id: str
    name: str
    description: str
    streak: int = 0
    target: int
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
       orm_mode = True

class Journal(BaseModel):
   id: Optional[int]
   content: str
   user_id: str
   created_at: datetime = Field(default_factory=datetime.now)


   class Config:
       orm_mode = True


