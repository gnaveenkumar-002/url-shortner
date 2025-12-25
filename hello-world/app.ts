
import { formatResponse, formatError, ApiResponse } from './types';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import validator from 'validator';
import * as dotenv from 'dotenv';
dotenv.config();
const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME!;

const generateShortId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const getShortUrlHandler = async (event: any): Promise<ApiResponse> => {
  console.log('EVENT:', JSON.stringify(event));
  try {
    const body = JSON.parse(event.body || '{}');
    const { url } = body;

    if (!url || !validator.isURL(url)) {
      return formatError(400, 'Invalid URL provided');
    }

    const shortId = generateShortId();

    const putCommand = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        shortId,
        originalUrl: url,
        createdAt: new Date().toISOString(),
      },
    });

    await ddbDocClient.send(putCommand);
    console.log('PUT DONE', shortId);

    return formatResponse(200, { shortId });
  } catch (error) {
    console.error('Error in getShortUrlHandler:', error);
    return formatError(500, 'Internal server error');
  }
};

export const redirectHandler = async (event: any): Promise<ApiResponse> => {
  try {
    const shortId = decodeURIComponent(event.pathParameters?.id as string);
    console.log('REDIRECT shortId:', shortId);

    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: { shortId },
    });

    const result = await ddbDocClient.send(getCommand);
    console.log('GET RESULT:', result);

    if (!result.Item) {
      return formatError(404, 'Short URL not found');
    }

    const originalUrl = (result.Item as any).originalUrl;

    return {
      statusCode: 301,
      headers: { Location: originalUrl },
      body: '',
    };
  } catch (error) {
    console.error('Error in redirectHandler:', error);
    return formatError(500, 'Internal server error');
  }
};
