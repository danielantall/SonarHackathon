from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
   pass 


class JournalModel(Base):
   __tablename__ = "journals"


   id = Column(Integer, primary_key=True, index=True, autoincrement=True)
   content = Column(String, nullable=False)
   user_id = Column(String, nullable=False)
   created_at = Column(DateTime, default=datetime.now, nullable=False)