from sqlalchemy.orm.session import Session
from webapp.db.models import DbLike
from webapp.db.schema import UserBase, TokenData, UserDisplay, SongBase
from webapp.db.hashing import Hash
from fastapi import HTTPException, status,Depends
from webapp.db.database import get_db


def create_like(db:Session, user_id:int, song_id:int):
    new_like = DbLike(
        user_id=user_id,
        song_id=song_id
    )
    db.add(new_like) #add a new user to the database
    db.commit()
    db.refresh(new_like) 
    return new_like

def get_like_by_user_id(db:Session,user_id:int):
    return db.query(DbLike).filter(DbLike.user_id == user_id).all()
