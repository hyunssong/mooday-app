from webapp.core.analysis.model import get_model, Model
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Dict

router = APIRouter(
    prefix='/api/analysis',
    tags=['analysis']
)

class SentimentRequest(BaseModel):
    text:str = ""

class SentimentResponse(BaseModel):
    probabilities:Dict[str,float]
    sentiment:str

@router.post("/predict", response_model=SentimentResponse)
def predict(request:SentimentRequest, model: Model = Depends(get_model)):
    sentiment, prob = model.predict(request.text)
    return SentimentResponse(
        sentiment=sentiment,
        probabilities = prob
    )

