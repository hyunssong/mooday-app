from unittest.util import strclass
from fastapi import APIRouter, HTTPException,status,Request
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm.session import Session
from webapp.db.database import get_db
from fastapi.param_functions import Depends
from webapp.db import models
from webapp.db.hashing import Hash
from webapp.auth import oauth2
from webapp.db import db_user
from datetime import datetime, timedelta
from webapp.db.schema import Token, Settings
from fastapi_jwt_auth import AuthJWT
from .oauth2 import ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.responses import JSONResponse
from .oauth2 import (ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, ALGORITHM, REFRESH_SECRET_KEY)
from jose import jwt
from jose import JWTError
from typing import List
router = APIRouter(
    prefix='/api/auth',
    tags=['authentication']
)


#generate the token 
@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = db_user.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        return JSONResponse(
            STATUS_CODE =401,
            content={'detail':"Incorrect username or password", }
        )
    access_token_expires =timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires =timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    #create JWT tokens
    access_token = oauth2.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    refresh_token = oauth2.create_refresh_token(
        data={"sub": user.username}, expires_delta=refresh_token_expires
    )

    return {"access_token": access_token,  "refresh_token":refresh_token, "token_type": "bearer"}

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_token:Token,db:Session = Depends(get_db)):
    credentials_exception =  HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
         )
    if refresh_token:
        try:
            payload = jwt.decode(refresh_token.access_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            expires = payload.get("exp")

            user = db_user.get_user_by_username(db,username)
            #create new access token 
            access_token_expires =timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            new_access_token = oauth2.create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)

            return {"access_token": new_access_token, "token_type": "bearer"}
        except JWTError:
            #refresh token expired 
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
         )
    else:
        raise credentials_exception
        
