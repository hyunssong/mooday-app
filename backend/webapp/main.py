from fastapi import FastAPI
from .routers import article, mood_analysis, user, song,like
from .db.database import engine
from .db import models
from .auth import authentication

from fastapi.middleware.cors import CORSMiddleware

app  = FastAPI()

app.include_router(article.router)
app.include_router(mood_analysis.router)
app.include_router(user.router)
app.include_router(authentication.router)
app.include_router(song.router)
app.include_router(like.router)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/api')
def index():
    return 'MooDAY'

models.Base.metadata.create_all(engine) #creates the database based on defined in models

if __name__ == "__main__":
    app.run()
