import aws, { S3 } from "aws-sdk";
import fs from "fs";
import { S3_UPLOAD_BUCKET_NAME } from "../../config";
import { errorLogger } from "../../utils/error-logger";
import { isStringEmpty } from "../../utils/string-utils";

const ACL = "private";

export class DocumentUploadService {
  static async uploadDocument(
    documentPath: string,
    fileName: string
  ): Promise<void> {
    if (isStringEmpty(documentPath)) {
      throw new Error("Document Path is empty");
    }

    if (!fs.existsSync(documentPath)) {
      throw new Error("Document Path does not exist");
    }

    let s3: S3;
    try {
      s3 = new aws.S3({
        apiVersion: "2006-03-01",
        region: "us-east-1"
      });
    } catch (error) {
      errorLogger("Handler/SubmissionServiceHandler", error);
      throw new Error("S3 client could not be started");
    }

    let fileStream;
    try {
      fileStream = fs.createReadStream(documentPath);
      fileStream.on("error", (error) => {
        errorLogger("Handler/SubmissionServiceHandler", error.message);
        throw new Error("File could not be read");
      });
    } catch (error) {
      errorLogger("Handler/SubmissionServiceHandler", error);
      throw new Error("File could not be read");
    }

    const uploadParams = {
      Bucket: S3_UPLOAD_BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
      ACL
    };

    try {
      await s3.upload(uploadParams).promise();
    } catch (error) {
      errorLogger("Handler/SubmissionServiceHandler", error);
      throw new Error("File could not be uploaded");
    }
  }
}
