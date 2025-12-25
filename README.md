# GNK URL Shortener (AWS SAM + Lambda + DynamoDB)

This is a serverless **URL shortener** built with AWS Lambda (Node.js 20 + TypeScript), API Gateway via AWS SAM, and DynamoDB for persistent storage.

## Features

- Shortens long URLs via a REST API.
- Stores mappings in DynamoDB using a `shortId`.
- Redirects `GET /short/{id+}` to the original URL with HTTP 301.
- Local development using `sam build` and `sam local start-api` with Docker.

## Tech Stack

- AWS SAM (Serverless Application Model).
- AWS Lambda (Node.js 20, TypeScript).
- Amazon DynamoDB.
- Node.js, TypeScript, Jest (for tests).

## Getting Started (Local)

### Prerequisites

- Node.js and npm.
- Docker running.
- AWS SAM CLI installed.

### Install dependencies

npm install


### Build and run locally
sam build
sam local start-api

The API will be available at:

`POST https://vxu3axyv91.execute-api.us-east-1.amazonaws.com/Prod/get-url-shortener

`GET  https://vxu3axyv91.execute-api.us-east-1.amazonaws.com/Prod/short/

### Example requests

Create a short URL: 
Request:
POST https://vxu3axyv91.execute-api.us-east-1.amazonaws.com/Prod/get-url-shortener
Example response:
{
"data": {
"shortId": "noNLQVDe"
},
"timestamp": "2025-12-25T13:40:19.642Z"
}

Request:
GET  https://vxu3axyv91.execute-api.us-east-1.amazonaws.com/Prod/short/{shortId}
Example response:
The link which the user enter for shortner-url

## Deployment (AWS)

sam build
sam deploy --guided


