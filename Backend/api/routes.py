from fastapi import APIRouter, Depends
from api.schemas import Journal
from db.database import get_db
from sqlalchemy.orm import Session
from db.models import JournalModel
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
def get_journals_by_id(user_id: str, db: Session = Depends(get_db)):
   return db.execute(text(f"SELECT * FROM journal WHERE user_id = '{user_id}'")).all()

# Habit Routes

