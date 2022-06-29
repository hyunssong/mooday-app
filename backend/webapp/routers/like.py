from fastapi import APIRouter,Depends
from typing import List
from webapp.db.schema import LikeBase, LikeDisplay
from sqlalchemy.orm import Session
from webapp.db.database import get_db
from webapp.db import db_like
# from app.auth.oauth2 import oauth2_scheme, get_current_user

router = APIRouter(
    prefix='/api/like',
    tags=['like']
)

#Create a new like relation
@router.post("", response_model = LikeDisplay) #by specifying the parameter- system automatically converts the output result
def create_post(request:LikeBase, db:Session= Depends(get_db)):
    return db_like.create_like(db,request.user_id, request.song_id)

@router.get("/{id}", response_model = List[LikeDisplay])
def get_like_by_user_id(id:int, db:Session=Depends(get_db)):
    return  db_like.get_like_by_user_id(db,id)