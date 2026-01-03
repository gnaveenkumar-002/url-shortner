import { APIGatewayProxyEvent } from "aws-lambda";
import { getShortUrlHandler, redirectHandler } from "../../app";
import { ddbMock } from "../../__mocks__/dynamodb";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

beforeEach(() => {
  ddbMock.reset();
});

/* ----------------------------------
   COMMON BASE EVENT
---------------------------------- */
const baseEvent = {
  requestContext: {
    domainName: "example.execute-api.us-east-1.amazonaws.com",
    stage: "Prod"
  }
} as any;

/* ==================================
   POST /get-url-shortner
================================== */

test("POST → 200 OK with shortId and shortUrl", async () => {
  ddbMock.on(PutCommand).resolves({});

  const event = {
    ...baseEvent,
    body: JSON.stringify({ url: "https://google.com" })
  } as APIGatewayProxyEvent;

  const response = await getShortUrlHandler(event);

  expect(response.statusCode).toBe(200);

  const body = JSON.parse(response.body);
  expect(body.shortId).toBeDefined();
  expect(body.shortUrl).toContain("/short/");
});

test("POST → 400 for invalid URL", async () => {
  const event = {
    ...baseEvent,
    body: JSON.stringify({ url: "invalid-url" })
  } as APIGatewayProxyEvent;

  const response = await getShortUrlHandler(event);

  expect(response.statusCode).toBe(400);
});

test("POST → 400 when request body is missing", async () => {
  const event = {
    ...baseEvent
  } as any;

  const response = await getShortUrlHandler(event);

  expect(response.statusCode).toBe(400);
});

test("POST → 500 when DynamoDB throws error", async () => {
  ddbMock.on(PutCommand).rejects(new Error("DynamoDB error"));

  const event = {
    ...baseEvent,
    body: JSON.stringify({ url: "https://google.com" })
  } as APIGatewayProxyEvent;

  const response = await getShortUrlHandler(event);

  expect(response.statusCode).toBe(500);
});

/* ==================================
   GET /short/{id}
================================== */

test("GET → 302 redirect when shortId exists", async () => {
  ddbMock.on(GetCommand).resolves({
    Item: { originalUrl: "https://google.com" }
  });

  const event = {
    pathParameters: { id: "abc123" }
  } as any;

  const response = await redirectHandler(event);

  expect(response.statusCode).toBe(302);
  expect(response.headers?.Location).toBe("https://google.com");
});

test("GET → 404 when shortId not found", async () => {
  ddbMock.on(GetCommand).resolves({});

  const event = {
    pathParameters: { id: "missing" }
  } as any;

  const response = await redirectHandler(event);

  expect(response.statusCode).toBe(404);
});

test("GET → 400 when shortId is missing", async () => {
  const event = {} as any;

  const response = await redirectHandler(event);

  expect(response.statusCode).toBe(400);
});

test("GET → 500 when DynamoDB throws error", async () => {
  ddbMock.on(GetCommand).rejects(new Error("DynamoDB error"));

  const event = {
    pathParameters: { id: "abc123" }
  } as any;

  const response = await redirectHandler(event);

  expect(response.statusCode).toBe(500);
});
