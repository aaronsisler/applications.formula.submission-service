import aws, { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { TABLE_NAME } from "../../config";
import { ApplicationField } from "../../models/application-field";
import { ApplicantSubmission } from "../../models/applicant-submission";
import { databaseKeyParser } from "../../utils/database-key-parser";
import { errorLogger } from "../../utils/error-logger";

export class DatabaseService {
  private documentClient: DynamoDB.DocumentClient;

  constructor() {
    aws.config.update({ region: "us-east-1" });
    this.documentClient = new aws.DynamoDB.DocumentClient();
  }

  async getApplicationFields(
    applicationId: string
  ): Promise<ApplicationField[]> {
    try {
      var params = {
        KeyConditionExpression:
          "PartitionKey = :partitionKey AND begins_with ( SortKey , :sortKey )",
        ExpressionAttributeValues: {
          ":partitionKey": `Application#${applicationId}`,
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
      errorLogger("Service:Database:getApplicationFields", error);
      throw new Error("Record not created");
    }
  }

  async uploadApplicant(
    applicantSubmission: ApplicantSubmission
  ): Promise<void> {
    const item = {
      PartitionKey: `Application#${applicantSubmission.applicationId}`,
      SortKey: `Applicant#${applicantSubmission.applicantId}`,
      ...applicantSubmission
    };
    try {
      const params = {
        TableName: TABLE_NAME,
        Item: item
      };
      await this.documentClient.put(params).promise();
    } catch (error) {
      errorLogger("Service:Database:uploadApplicant", error);
      throw new Error("Record not created");
    }
  }
}
