#get the base node image from dockerhub
FROM node:12

#set working dir for container
WORKDIR /frontend

#copy dependencies
COPY ./package.json /frontend/package.json

#install dependencies
RUN npm install 
#copy app
COPY . /frontend
#build production-ready code
RUN npm run build
# #expose the port
# EXPOSE 3000
# Install `serve` to run the application.
RUN npm install -g serve

# execute start script
# CMD npm start
CMD serve -s build