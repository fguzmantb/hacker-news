# Hacker News
This project provides a Hacker News Node JS feed.

## Installation
Use [Docker](https://www.docker.com/) to build and run the images defined in docker compose file

```bash
docker-compose build
```

### Project
The project contains three elements
* News server: back-end app built with Node.js and Express
* News client: front-end app built with React
* Mongo DB: persistence database.

## Usage

Use docker compose up command to run the images
```bash
docker-compose up
```
and the web pages can be access through localhost http://localhost/ or docker machine ip http://{docker-machine-ip}

