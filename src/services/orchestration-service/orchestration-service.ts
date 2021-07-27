import { ApplicationMapperService } from "../application-mapper-service";
import { DocumentUploadService } from "../document-upload-service";
import { MessageParserService } from "../message-parser-service";
import { PdfGenerationService } from "../pdf-generation-service";
import { ApplicationSubmission } from "../../models/application-submission";
import { timeElapsedLogger } from "../../utils/time-elapsed-logger";

export class OrchestrationService {
  static async processApplicationSubmission(eventBody: string) {
    const totalMethodStartTime = Date.now();

    // Receive message from SQS and parse to POJO
    let methodStartTime = Date.now();
    const applicationSubmission: ApplicationSubmission =
      MessageParserService.parseMessage(eventBody);
    timeElapsedLogger(methodStartTime, "Parse Message");

    // Get the field labels etc. from DDB
    methodStartTime = Date.now();
    const applicationMarkupMapper =
      await ApplicationMapperService.mapApplicationSubmission(
        applicationSubmission
      );
    timeElapsedLogger(methodStartTime, "Map Submission");

    // Build out the application pdf
    methodStartTime = Date.now();
    const { documentPath, fileName } = PdfGenerationService.generatePdf(
      applicationMarkupMapper
    );
    timeElapsedLogger(methodStartTime, "Generate PDF");

    // Push pdf to S3
    methodStartTime = Date.now();
    await DocumentUploadService.uploadDocument(documentPath, fileName);
    timeElapsedLogger(methodStartTime, "Doc Upload");

    // Save pdf location and needed info to DDB

    // Event based?: Send email notifying managers of tenant about application

    // Log total run time
    timeElapsedLogger(totalMethodStartTime, "Total Method");
  }
}
