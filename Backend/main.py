from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from db.database import *
from db.models import *
from api.schemas import *
from api.routes import Router

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(Router, prefix="/api", tags=["api"])