from fastapi import APIRouter,Depends
from typing import List
from db.schema import ArticleBase, ArticleDisplay
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_article

router = APIRouter(
    prefix='/article',
    tags=['article']
)

#Create article
@router.post("/", response_model = ArticleDisplay) #by specifying the parameter- system automatically converts the output result
def create_post(request:ArticleBase, db:Session= Depends(get_db)):
    return db_article.create_article(db, request)

#Read Article
@router.get("/", response_model = List[ArticleDisplay])
def get_post(user_id:int, db:Session=Depends(get_db)):
    return db_article.get_article_by_user_id(db,user_id)

@router.get("/{id}")
def get_post_by_id(id:int, db:Session=Depends(get_db)):
    return {
        'data': db_article.get_article_by_id(db,id),
    }
    return db_article.get_article_by_id(db,id)

#update
@router.post("/{id}/update", response_model = ArticleDisplay)
def update_post(id:int, db:Session=Depends(get_db)):
    return db_article.get_article_by_id(db,id)

#delete
@router.post("/{id}/delete", response_model = ArticleDisplay)
def update_post(id:int, db:Session=Depends(get_db)):
    return db_article.delete_article(db,id)