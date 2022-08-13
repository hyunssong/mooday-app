from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pathlib import Path
import os

dotenv_path = Path('webapp/.env')
load_dotenv(dotenv_path=dotenv_path)

# SQLALCHEMY_DATABASE_URL = "sqlite:///../fastapi-practice.db"
DATABASE_URL = os.environ["DATABASE_URL"]

engine = create_engine(
    DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal() #get db session
    try:
        yield db
    finally:
        db.close()
