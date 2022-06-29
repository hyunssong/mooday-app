from webapp.db.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship

class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    music = Column(String)

class DbArticle(Base):
    """"model """
    __tablename__ = 'articles'
    id = Column(Integer, primary_key=True, index=True) #automatic index generation
    title = Column(String)
    content = Column(String)
    sentiment = Column(String)
    published= Column(Boolean)
    user_id = Column(Integer)

class DbSong(Base):
    """"model """
    __tablename__ = 'songs'
    id = Column(Integer, primary_key=True, index=True) #automatic index generation
    title = Column(String)
    artist = Column(String)
    mood = Column(String)
    img = Column(String)
    url = Column(String)

class DbLike(Base):
    """"model """
    __tablename__ = 'likes'
    id = Column(Integer, primary_key=True, index=True) #automatic index generation
    user_id = Column(Integer)
    song_id = Column(Integer)
