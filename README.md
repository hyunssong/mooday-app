<<<<<<< HEAD
# MooDAY

MooDay is a webapp that recommends music based on the recent user mood. User mood is analyzed and classified into three categories (Positive/Neutral/Negative), which is decided by sentiment analysis on recent user post.
<br/>
<br/>
## Tech Stack
1. Backend is implemented using FastAPI. This framework was selected to serve the machine learning model that is used for sentiment analysis.
2. The model that is used for sentiment analysis is a BERT model that is finetuned on Twitter sentiment analysis data available [here](https://www.kaggle.com/competitions/twitter-sentiment-analysis2/data).
2. Frontend is developed using ReactJS with the use of Material-UI.
3. PostgreSQL was used for database.
4. Deploy was done on Heroku with Docker. The FastAPI serves the ReactJS frontend build output (This approach was due to the fairly simple UI, but it might not be the optimal approach).
<br/><br/>
## How To Use
1. Download the finetuned model in backend/assets/download_model and unzip the model into backend/assets.
2. Edit the Dockerfile env variables
3. Build the Docker image.
