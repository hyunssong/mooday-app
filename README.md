# mooday-deploy
deploy version of mooday 

Please see the mooday repository for the development process of this website.

## Description

Recommends music based on the recent user mood. User mood is analyzed and classified into three categories(Positive/Neutral/Negative), which is decided by recent user post.

## How To Use
Use the Dockerfile of the ackend and frontend to run it in your local computer.
```
docker build -t dockerimagename .
docker run -d dockerimagename
```

