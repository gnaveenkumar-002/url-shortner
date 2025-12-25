# GNK URL Shortener (AWS SAM + Lambda + DynamoDB)

This is a serverless **URL shortener** built with AWS Lambda (Node.js 20 + TypeScript), API Gateway via AWS SAM, and DynamoDB for persistent storage.[web:56][web:62]

## Features

- Shortens long URLs via a REST API.
- Stores mappings in DynamoDB using a `shortId`.
- Redirects `GET /short/{id+}` to the original URL with HTTP 301.
- Local development using `sam build` and `sam local start-api` with Docker.[web:57][web:51]

## Tech Stack

- AWS SAM (Serverless Application Model).
- AWS Lambda (Node.js 20, TypeScript).
- Amazon DynamoDB.
- Node.js, TypeScript, Jest (for tests).[web:56][web:69]

## Getting Started (Local)

### Prerequisites

- Node.js and npm.
- Docker running.
- AWS SAM CLI installed.[web:57][web:51]

### Install dependencies

npm install


### Build and run locally
sam build
sam local start-api

The API will be available at:

- `POST http://127.0.0.1:3000/get-url-shortener`
- `GET  http://127.0.0.1:3000/short/{id+}`[web:51]

### Example requests

Create a short URL:

Example response:
{
"data": {
"shortId": "noNLQVDe"
},
"timestamp": "2025-12-25T13:40:19.642Z"
}


## Deployment (AWS)

sam build
sam deploy --guided

Follow the interactive prompts to configure stack name, region, and parameters, then SAM will deploy the Lambda functions, API Gateway, and DynamoDB table to your AWS account.[web:57][web:75]

### Environment variables

Create a `.env` file in the project root:

undefined