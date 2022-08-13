from sqlalchemy.orm.session import Session
from db.models import DbArticle
from db.schema import ArticleBase, UserDisplay

def create_article(db:Session, request:ArticleBase):
    new_article = DbArticle(
        title=request.title,
        content=request.content,
        sentiment=request.sentiment,
        published=request.published,
        user_id=request.user_id
    )
    db.add(new_article) #add a new user to the database
    db.commit()
    db.refresh(new_article)
    return new_article

def get_article(db:Session):
    return db.query(DbArticle).all()

def get_article_by_user_id(db:Session,user_id:int):
    # user_id = request.user_id
    return db.query(DbArticle).filter(DbArticle.user_id == user_id).all()

def get_article_by_id(db:Session,id:int):
    return db.query(DbArticle).filter(DbArticle.id == id).first()

def update_article_by_id(db:Session,id:int, request:ArticleBase):
    article = db.query(DbArticle).filter(DbArticle.id == id).first()
    article.update({
        DbArticle.title: request.title,
        DbArticle.content : request.content
    })
    db.commit()
    return 'ok'

def delete_article(db:Session, id:int):
    user = db.query(DbArticle).filter(DbArticle.id == id).first()
    db.delete(user)
    db.commit()
