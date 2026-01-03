import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Global DynamoDB mock used across all tests.
 * Prevents real AWS calls.
 */
export const ddbMock = mockClient(DynamoDBDocumentClient);
