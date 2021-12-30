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

### Stopping the container
```sh
docker stop app
```

### Removing the image
```
docker rmi testcase-application
```