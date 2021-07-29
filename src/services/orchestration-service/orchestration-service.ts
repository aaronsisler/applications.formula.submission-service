import { ApplicantUploadService } from "../applicant-upload-service";
import { ApplicationMapperService } from "../application-mapper-service";
import { DocumentUploadService } from "../document-upload-service";
import { MessageParserService } from "../message-parser-service";
import { PdfGenerationService } from "../pdf-generation-service";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { ApplicationSubmission } from "../../models/application-submission";
import { timeElapsedLogger } from "../../utils/time-elapsed-logger";
import { uuidGenerator } from "../../utils/uuid-generator";

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
    const applicationMarkupMapper: ApplicationMarkupMapper =
      await ApplicationMapperService.mapApplicationSubmission(
        applicationSubmission
      );
    timeElapsedLogger(methodStartTime, "Map Submission");

    // Build out the application pdf
    methodStartTime = Date.now();
    const applicantId = uuidGenerator();
    const { documentPath, fileName } = PdfGenerationService.generatePdf(
      applicationMarkupMapper,
      applicantId
    );
    timeElapsedLogger(methodStartTime, "Generate PDF");

    // Push pdf to S3
    methodStartTime = Date.now();
    await DocumentUploadService.uploadDocument(documentPath, fileName);
    timeElapsedLogger(methodStartTime, "Doc Upload");

    // Save pdf location and needed info to DDB
    await ApplicantUploadService.upload(applicantId, applicationMarkupMapper);

    // Event based?: Send email notifying managers of tenant about application

    // Log total run time
    timeElapsedLogger(totalMethodStartTime, "Total Method");
  }
}
