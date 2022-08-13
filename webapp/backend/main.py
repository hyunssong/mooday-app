from fastapi import FastAPI,Request
from routers import article, mood_analysis, user, song, like
from db.database import engine
from db import models
from auth import authentication
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
import os
from fastapi.responses import HTMLResponse

THIS_PATH = os.path.dirname(os.path.abspath(__file__))

# main app
app  = FastAPI(title="app root")

# api app
api_app = FastAPI(title="api root")

api_app.include_router(article.router)
api_app.include_router(mood_analysis.router)
api_app.include_router(user.router)
api_app.include_router(authentication.router)
api_app.include_router(song.router)
api_app.include_router(like.router)

@api_app.get("/")
def main(request: Request):
    return {"message": "Hello World from MooDAY API"}

app.mount("/api", api_app)


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

app.mount("/static", StaticFiles(directory=os.path.join(THIS_PATH, "static")), name="static") # ?

templates = Jinja2Templates(
    directory=os.path.join(THIS_PATH, "templates")
)


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request}
    )

#creates the database based on defined in models
models.Base.metadata.create_all(engine)

if __name__ == "__main__":
    app.run()
