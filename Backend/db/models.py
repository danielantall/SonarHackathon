from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
   pass 


class JournalModel(Base):
   __tablename__ = "journal"


   id = Column(Integer, primary_key=True, index=True, autoincrement=True)
   content = Column(String, nullable=False)
   user_id = Column(String, nullable=False)
   created_at = Column(DateTime, nullable=False)

class HabitModel(Base):
   __tablename__ = "habit"

   id = Column(Integer, autoincrement=True, primary_key=True, index=True)
   name = Column(String, nullable=False)
   description = Column(String, nullable=False)
   streak = Column(Integer, nullable=False)
   created_at = Column(DateTime, nullable=False)
