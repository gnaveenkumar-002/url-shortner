import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import validator from "validator";
import { saveUrl, getUrl } from "./db";
import {
  jsonResponse,
  redirectResponse,
  errorResponse
} from "./types";

/**
 * Generates a random short id
 */
const generateShortId = (): string =>
  Math.random().toString(36).substring(2, 10);

/**
 * POST /get-url-shortner
 * Creates a short URL and returns it
 */
export const getShortUrlHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");

    // Validate URL
    if (!body.url || !validator.isURL(body.url)) {
      return errorResponse(400, "Invalid URL");
    }

    const shortId = generateShortId();

    // Save to DynamoDB
    await saveUrl({
      shortId,
      originalUrl: body.url,
      createdAt: new Date().toISOString(),
    });

    const shortUrl = `https://${event.requestContext.domainName}/${event.requestContext.stage}/short/${shortId}`;

    return jsonResponse(200, {
      shortId,
      shortUrl,
    });
  } catch (error) {
    console.error("POST error:", error);
    return errorResponse(500, "Internal server error");
  }
};

/**
 * GET /short/{id}
 * Redirects to the original URL
 */
export const redirectHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, "Missing short id");
    }

    const result: any = await getUrl(decodeURIComponent(id));

    if (!result?.Item) {
      return errorResponse(404, "Short URL not found");
    }

    return redirectResponse(result.Item.originalUrl);
  } catch (error) {
    console.error("GET error:", error);
    return errorResponse(500, "Internal server error");
  }
};
