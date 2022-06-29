from fastapi import APIRouter,Depends
from typing import List
from webapp.db.schema import SongBase, SongDisplay
from sqlalchemy.orm import Session
from webapp.db.database import get_db
from webapp.db import db_song
router = APIRouter(
    prefix='/api/song',
    tags=['song']
)

@router.get("/{id}", response_model = SongDisplay)
def get_song_by_id(id:int, db:Session=Depends(get_db)):
    return db_song.get_song_by_id(db,id)

@router.get("/mood/{mood}", response_model = List[SongDisplay])
def get_song_by_mood(mood:str, db:Session=Depends(get_db)):
    return db_song.get_song_by_mood(db,mood)

