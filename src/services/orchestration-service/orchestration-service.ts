import { ApplicationMapperService } from "../application-mapper-service";
import { DocumentUploadService } from "../document-upload-service";
import { MessageParserService } from "../message-parser-service";
import { PdfGenerationService } from "../pdf-generation-service";
import { ApplicationSubmission } from "../../models/application-submission";

export class OrchestrationService {
  static async processApplicationSubmission(eventBody: string) {
    // Receive message from SQS and parse to POJO
    const applicationSubmission: ApplicationSubmission =
      MessageParserService.parseMessage(eventBody);

    // Get the field labels etc. from DDB
    const applicationMarkupMapper =
      await ApplicationMapperService.mapApplicationSubmission(
        applicationSubmission
      );

    // Build out the application pdf
    const { documentPath, fileName } = PdfGenerationService.generatePdf(
      applicationMarkupMapper
    );

    // Push pdf to S3
    await DocumentUploadService.uploadDocument(documentPath, fileName);

    // Save pdf location and needed info to DDB

    // Event based?: Send email notifying managers of tenant about application
  }
}
