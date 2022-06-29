FROM python:3.8-slim-buster
WORKDIR /backend
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get -y install python-psycopg2 \
  && apt-get -y install libpq-dev\
  && apt-get clean
# install python dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt
COPY . /backend
#run the app
CMD gunicorn --forwarded-allow-ips="*" -k uvicorn.workers.UvicornWorker webapp.main:app 