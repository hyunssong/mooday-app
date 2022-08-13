# multi stage docker build process
# build react app
FROM node:12 AS node_build
WORKDIR /app
# setting up frontend dependencies
COPY ./frontend/package.json ./
# install dependencies
RUN npm install
COPY ./frontend/ ./
RUN npm run build

FROM python:3.8-slim-buster AS main
WORKDIR /app
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get -y install python-psycopg2 \
  && apt-get -y install libpq-dev\
  && apt-get clean
COPY ./backend/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# pass env variables
ENV SECRET_KEY "SECRET"
ENV REFRESH_SECRET_KEY "REFRESH_SECRET"
ENV DATABASE_URL "DB_URL"

COPY ./backend ./
# copy react build output into this image
COPY --from=node_build /app/build/static /app/static
COPY --from=node_build /app/build/index.html /app/templates/
COPY --from=node_build /app/build/asset-manifest.json /app/
COPY --from=node_build /app/build/manifest.json /app/
COPY --from=node_build /app/build/robots.txt /app/

#run the app
CMD gunicorn --forwarded-allow-ips="*" -k uvicorn.workers.UvicornWorker main:app