from gc import get_debug
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from datetime import datetime, timedelta
from jose import jwt
from fastapi.param_functions import Depends
from sqlalchemy.orm.session import Session
from webapp.db.database import get_db
from fastapi import HTTPException, status
from webapp.db.schema import UserBase, UserDisplay
from jose import JWTError
from webapp.db import db_user
from typing import Union
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from pathlib import Path
dotenv_path = Path('webapp/.env')
load_dotenv(dotenv_path=dotenv_path)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY =os.getenv("SECRET_KEY")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY")
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

def create_access_token(data: dict, expires_delta: int=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: int=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() +  expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt