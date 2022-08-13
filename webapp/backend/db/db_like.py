from sqlalchemy.orm.session import Session
from db.models import DbLike
from db.schema import UserBase, TokenData, UserDisplay, SongBase
from fastapi import Depends
from db.database import get_db


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
