from tokenize import Token
from fastapi import APIRouter,Depends,HTTPException
from typing import List
from webapp.db.schema import UserBase, UserDisplay,Token
from sqlalchemy.orm import Session
from webapp.db.database import get_db
from webapp.db import db_user
from fastapi_jwt_auth import AuthJWT

router = APIRouter(
    prefix='/api/user',
    tags=['user']
)

#Create user
@router.post("", response_model = Token)
def create_user(request:UserBase, db:Session= Depends(get_db)):
    return db_user.create_user(db, request)

#retrieve the authenticated user (protected endpoint)
@router.get('/me')
async def read_users_me(current_user: UserDisplay = Depends(db_user.get_current_user)):
    return current_user

@router.get('/{id}')
def get_user_by_id(id:int, db:Session=Depends(get_db)):
    return db_user.get_user_by_id(id)

