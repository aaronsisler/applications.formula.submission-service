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
    // TODO

    // Build out the application pdf
    const { documentPath, fileName } = PdfGenerationService.generatePdf(
      applicationSubmission
    );

    // Push pdf to S3
    await DocumentUploadService.uploadDocument(documentPath, fileName);

    // Save pdf location and needed info to DDB

    // Event based?: Send email notifying managers of tenant about application
  }
}
