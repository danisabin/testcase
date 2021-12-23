# Test Service
Test Service with healthchecks

## Requirements
* Node.js v16.x or later
* NPM

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