# Test Service
Test Service with healthchecks

## Requirements
- NodeJS 12 or higher
- NPM 6 or higher
- Docker 20 or higher
- Git

## Optional
- Docker-compose 1.29 or higher

## Set up and run
```sh
# install dependencies
$ npm install

# start the server
$ npm start

# The config is in ./src/config.js_
# environment variables are defined in .env file
```

## Endpoints
```sh
# GET `/__health/liveness`
curl -v http://localhost:3000/__health/liveness

# responses
# 200
{
  "statusCode": 200,
  "code": "HLTH2001",
  "message": "Liveness successfully!"
}

# GET `/__health/readiness` (this one needs a ddbb running and reachable named testcase. This could be edited in .env file)
curl -v http://localhost:3000/__health/readiness

# responses
# 200
{
  "statusCode": 200,
  "code": "HLTH2002",
  "message": "Readiness successfully!"
}

# 503
{
  "statusCode": 503,
  "code": "HLTH5031",
  "message": "Impossible get readiness"
}
```

## API Documentation

Once the server is up un running, we can access it in: `http://localhost:3000/documentation`

## Dockerizing the NodeJS application

There is a Dockerfile for the application, called `Dockerfile.application`.

### Building the image
```sh
docker build -f Dockerfile.application -t testcase-application .
```

### Running a container from that image
```sh
docker run -p 3000:3000 --name app -d --rm testcase-application
```

> At this point, we can send a GET request to the `liveness` endpoint to test the container.

### Stopping the container
```sh
docker stop app
```

### Removing the image
```
docker rmi testcase-application
```

## Provisioning a PostgreSQL database with Docker

There is a dockerfile for PostgreSQL, called `Dockerfile.database`.

### Building the image
```sh
docker build -f Dockerfile.database -t testcase-database .
```

### Running a container from that image
```sh
docker run -p 5432:5432 --name db -d --rm --env-file .env testcase-database
```

> At this point, we can start the NodeJS application (`npm start`) and send a GET request to the `readiness` endpoint to test the container.

### Stopping the container
```sh
docker stop db
```

### Removing the image
```
docker rmi testcase-database
```

## Running both the NodeJS application and PostgreSQL in Docker

We will use Docker Compose for that, with definitions in a file called `docker-compose.yml`.

### Running the applications with Docker Compose
```sh
docker-compose up -d
```

> When the containers are ready, we can send a GET request to the `readiness` endpoint to test both containers.

### Stopping the applications with Docker Compose
```sh
docker-compose down
```

## What is the difference between liveness and readiness?

Using the **liveness** endpoint, we can check that the application is 'live', in the sense that it's running and able to respond to the request. Although that is different from being healthy; an application can be running but with faulty behavior.

The **readiness** endpoint allows us to check that the application is running and is healthy; it's 'ready' to receive traffic. In the case of this application, it's considered ready if it can connect to the database and perform a simple SQL query.