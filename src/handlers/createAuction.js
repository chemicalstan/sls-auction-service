import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const now = new Date();
  const { title } = JSON.parse(event.body);
  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createAt: now.toISOString(),
  };
  await dynamoDb
    .put({
      TableName: "AuctionsTable",
      Item: auction,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;
