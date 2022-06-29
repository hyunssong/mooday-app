from sqlalchemy.orm.session import Session
from webapp.db.models import DbUser
from webapp.db.schema import UserBase, TokenData, UserDisplay, SongBase
from webapp.db.hashing import Hash
from fastapi import HTTPException, status,Depends
from webapp.auth.oauth2 import oauth2_scheme, create_access_token
from webapp.db.database import get_db
from passlib.context import CryptContext
from jose import jwt
from jose import JWTError
from webapp.auth import oauth2
from webapp.auth.oauth2 import (ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES)
from datetime import datetime, timedelta
from pathlib import Path
from dotenv import load_dotenv
import os
dotenv_path = Path('webapp/.env')
load_dotenv(dotenv_path=dotenv_path)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY =os.getenv("SECRET_KEY")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY")
ALGORITHM = 'HS256'

def create_user(db:Session, request:UserBase):
    new_user = DbUser(
        username = request.username,
        email = request.email,
        password = Hash.bcrypt(request.password), #store the password encrypted
        music = request.music, 
    )
    db.add(new_user) #add a new user to the database
    db.commit()
    db.refresh(new_user) 
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    access_token = oauth2.create_access_token(
        data={"sub": new_user.username}, expires_delta=access_token_expires
    )
    refresh_token = oauth2.create_refresh_token(
         data={"sub": new_user.username}, expires_delta=refresh_token_expires
    )
    return {"access_token": access_token,"refresh_token":refresh_token, "token_type": "bearer"}

def get_user_by_id(db:Session, id: int):
    user = db.query(DbUser).filter(DbUser.id==id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail =f'User with id {id} not found')
    return user

def get_user_by_username(db:Session, username:str):
    user = db.query(DbUser).filter(DbUser.username==username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail =f'User with username {username} not found')
    return user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db:Session, username:str, password:str):
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

async def get_current_user(db:Session=Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        expires = payload.get("exp")
        
        #validate username
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username, expires=expires)
        user = get_user_by_username(db, username=token_data.username)
        if user is None:
            raise credentials_exception
        return user

    except JWTError:
        #this includes the token expiration 
        raise credentials_exception
   

async def get_current_active_user(current_user: UserDisplay = Depends(get_current_user)):
    return current_user




    

