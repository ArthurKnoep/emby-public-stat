# Emby Quick Stats

//TODO Add an image of the project

> Emby Quick Stats is a quick project written in node and working with docker, docker-compose and mongo. The goal of the project is to provide a little interface for displaying stats about an Emby instance.

## Configuration
In the Dockerfile you need to replace:
- \<URL> by the url of your emby server without trailing slash (ex: `http://50.60.70.80` or `https://emby.myname.com`)
- \<KEY> by the api key that you can get on your server (Settings > Advanced > Security > New)

## Running
This project use docker and docker-compose. You can install them with these links: https://docs.docker.com/install/ and https://docs.docker.com/compose/install/

```bash
docker-compose build # run first

docker-compose up # launch the project in terminal
docker-compose up -d # launch the project in detach mode
```

For "production" use the detach mode