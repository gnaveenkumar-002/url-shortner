import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME!;

export const saveUrl = async (item: {
  shortId: string;
  originalUrl: string;
  createdAt: string;
}) => {
  return ddb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    })
  );
};

export const getUrl = async (shortId: string) => {
  return ddb.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { shortId }
    })
  );
};
