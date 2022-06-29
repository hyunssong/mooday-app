from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import datetime
import os

class Article(BaseModel):
    title:str
    content:str
    sentiment:str
    published:bool
    class Config():
        orm_mode = True

class ArticleBase(BaseModel):
    title:str
    content:str
    sentiment:str
    published:bool
    user_id: int

class ArticleDisplay(BaseModel):
    id:int
    title:str
    content:str
    sentiment:str
    user_id: int
    class Config():
        orm_mode = True

class UserBase(BaseModel):
    username:str
    email:str
    password:str
    music:str

class UserDisplay(BaseModel):
    id:int
    username:str
    email:str
    music:str
    class Config():
        orm_mode = True

class Token(BaseModel):
    access_token: str
    refresh_token:str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None
    expires: Optional[datetime]

class SongBase(BaseModel):
    id:int
    title:str
    artist:str
    mood:str
    img:str
    url:str

class SongDisplay(BaseModel):
    id:int
    title:str
    artist:str
    mood:str
    img:str
    url:str
    class Config():
        orm_mode = True

class LikeBase(BaseModel):
    user_id:int
    song_id:int

class LikeDisplay(BaseModel):
    id:int
    user_id:int
    song_id:int
    class Config():
        orm_mode = True

class Settings(BaseModel):
    authjwt_secret_key: str = "secret"



