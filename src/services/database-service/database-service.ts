import aws, { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { TABLE_NAME } from "../../config";
import { ApplicationField } from "../../models/application-field";
import { databaseKeyParser } from "../../utils/database-key-parser";
import { errorLogger } from "../../utils/error-logger";

export class DatabaseService {
  private static documentClient: DynamoDB.DocumentClient;

  constructor() {
    aws.config.update({ region: "us-east-1" });
    DatabaseService.documentClient = new aws.DynamoDB.DocumentClient();
  }

  static async getApplicationFields(
    applicationId: string
  ): Promise<ApplicationField[]> {
    try {
      var params = {
        KeyConditionExpression:
          "PartitionKey = :partitionKey AND begins_with ( SortKey , :sortKey )",
        ExpressionAttributeValues: {
          ":partitionKey": applicationId,
          ":sortKey": "ApplicationField"
        },
        TableName: TABLE_NAME
      };
      const { Items } = await this.documentClient.query(params).promise();

      const applicationFields: ApplicationField[] = Items.map(
        (item: DocumentClient.AttributeMap) =>
          new ApplicationField({
            applicationId: databaseKeyParser(item.PartitionKey),
            applicationFieldId: databaseKeyParser(item.SortKey),
            ...item
          })
      );

      return applicationFields;
    } catch (error) {
      errorLogger("Service:Database", error);
      throw new Error("Record not created");
    }
  }
}
