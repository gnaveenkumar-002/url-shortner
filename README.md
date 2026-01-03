URL Shortener using AWS SAM

A production-ready URL Shortener (like bit.ly) built using AWS SAM, Lambda, API Gateway, DynamoDB, TypeScript, Jest, and GitHub Actions CI/CD.

🚀 Features

Shorten long URLs

Redirect using short URLs

URL validation

DynamoDB persistence

100% unit test coverage

Multi-environment deployment (DEV & PROD)

Secure GitHub Actions deployment using IAM OIDC

Infrastructure as Code using AWS SAM

🏗 Architecture

Client (Postman / Browser)
        |
        v
API Gateway (REST)
        |
        v
AWS Lambda (TypeScript)
        |
        v
DynamoDB

🧰 Tech Stack

Language: TypeScript (Node.js 24.x)

Backend: AWS Lambda

API: Amazon API Gateway (REST)

Database: DynamoDB

IaC: AWS SAM

Testing: Jest + ts-jest

CI/CD: GitHub Actions

Auth: IAM Role with GitHub OIDC

📂 Project Structure

project-url-shortner/
│
├── .github/
│   └── workflows/
│       └── sam-deploy.yml
│
├── hello-world/
│   ├── app.ts
│   ├── db.ts
│   ├── types.ts
│   ├── __mocks__/
│   │   └── dynamodb.ts
│   ├── tests/
│   │   └── unit/
│   │       └── test-handler.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.ts
│
├── template.yaml
├── samconfig.toml
└── README.md
🔌 API Endpoints
1️⃣ POST /get-url-shortner

Description
Creates a short URL for a given long URL.

Request
{
  "url": "https://example.com"
}

Response (200 OK)
{
  "shortId": "e29wdcah",
  "shortUrl": "https://<api-id>.execute-api.<region>.amazonaws.com/Dev/short/e29wdcah"
}
2️⃣ GET /short/{shortId}

Description
Redirects to the original URL.

Response

302 Found

Redirects to original URL

🧪 Unit Testing (Jest)
✔ What is covered

POST success

POST invalid URL

POST missing body

POST DynamoDB failure

GET success redirect

GET not found

GET missing ID

GET DynamoDB failure

✔ Coverage
Statements   : 100%
Branches     : 100%
Functions    : 100%
Lines        : 100%

Run tests locally
cd hello-world
npm install
npm test


Coverage report is generated automatically.

🧑‍💻 Local Development (SAM)
Build
sam build

Run locally
sam local start-api

Test locally
POST http://127.0.0.1:3000/get-url-shortner
GET  http://127.0.0.1:3000/short/{id}

🌍 Multi-Environment Deployment
Environments

DEV → develop branch

PROD → main branch

Each environment has:

Separate API Gateway stage

Separate DynamoDB table

Separate CloudFormation stack

🔁 Deployment Flow
DEV Deployment

Push code to develop branch

GitHub Actions runs tests

SAM deploys to DEV stack

API stage = /Dev

PROD Deployment

Create PR from develop → main

Merge PR after review

GitHub Actions deploys PROD stack

API stage = /Prod

🤖 GitHub Actions CI/CD
Workflow Jobs

test

Install dependencies

Run unit tests

deploy-dev

Triggered on develop

Deploys DEV stack

deploy-prod

Triggered on main

Deploys PROD stack

Protected by environment approval (optional)

🔐 AWS Authentication (Best Practice)

Uses IAM Role with GitHub OIDC

No AWS credentials stored in GitHub secrets

Secure, short-lived tokens

Follows AWS recommended approach

🛠 SAM Template Highlights

Parameters for environment

DynamoDB table per environment

Shared Lambda code

API Gateway stage based on environment

esbuild for fast builds

📦 Deployment Commands (Manual)
sam build
sam deploy --guided


or via CI/CD automatically.

✅ Assignment Checklist

✔ URL shortener logic
✔ DynamoDB integration
✔ URL validation
✔ Error handling
✔ Generic response helpers
✔ 302 redirect
✔ Unit tests (100% coverage)
✔ Mocked AWS services
✔ GitHub Actions CI/CD
✔ Multi-stage deployment
✔ IAM OIDC authentication

👨‍💻 Author

G. Naveen Kumar
B.Tech – Computer Science & Engineering
GitHub: https://github.com/gnaveenkumar-002