import { MessageParserService } from "../message-parser-service";
import { PdfGenerationService } from "../pdf-generation-service";
import { ApplicationSubmission } from "../../models/application-submission";

export class OrchestrationService {
  static processApplicationSubmission(eventBody: string) {
    // Receive message from SQS and parse to POJO
    const applicationSubmission: ApplicationSubmission =
      MessageParserService.parseMessage(eventBody);

    // Build out the application pdf
    PdfGenerationService.generatePdf(applicationSubmission);
    // Push pdf to S3
    // Save pdf location and needed info to DDB
    // Event based?: Send email notifying managers of tenant about application
    // Ack message in SQS
  }
}
