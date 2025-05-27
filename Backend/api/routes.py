from fastapi import APIRouter, Depends
from api.schemas import Journal, Habit
from db.database import get_db
from sqlalchemy.orm import Session
from db.models import JournalModel, HabitModel
from sqlalchemy import text
import json


Router = APIRouter()

# Journal Routes
@Router.post("/addjournal/", response_model=Journal)
def add_journal(journal: Journal, db: Session = Depends(get_db)):
   new_journal = JournalModel(**journal.dict())
   db.add(new_journal)
   db.commit()
   db.refresh(new_journal)
   return new_journal

@Router.get("/journals/", response_model=list[Journal])
def get_journals_by_user(user_id: str, db: Session = Depends(get_db)):
   return db.execute(text(f"SELECT * FROM journal WHERE user_id = '{user_id}'")).all()

# Habit Routes

@Router.post("/addhabit", response_model=Habit)
def add_habit(habit: Habit, db: Session = Depends(get_db)):
   new_habit = HabitModel(**habit.dict())
   db.add(new_habit)
   db.commit()
   db.refresh(new_habit)
   return new_habit

@Router.get("/habits", response_model=list[Habit])
def get_habits_by_user(user_id: str, db: Session = Depends(get_db)):
   return db.query(HabitModel).filter_by(user_id = user_id).all()

