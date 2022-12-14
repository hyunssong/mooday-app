from sqlalchemy.orm.session import Session
from db.models import DbSong
from db.schema import SongBase, SongDisplay

def get_song_by_mood(db:Session,mood:str):
    return db.query(DbSong).filter(DbSong.mood == mood).all()

def get_song_by_id(db:Session,id:int):
    return db.query(DbSong).filter(DbSong.id == id).first()