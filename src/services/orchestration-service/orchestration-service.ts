import path from "path";
import { ApplicantUploadService } from "../applicant-upload-service";
import { ApplicationMapperService } from "../application-mapper-service";
import { DocumentUploadService } from "../document-upload-service";
import { MessageParserService } from "../message-parser-service";
import { PdfGenerationService } from "../pdf-generation-service";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { ApplicationSubmission } from "../../models/application-submission";
import { PdfDocumentMapper } from "../../models/pdf-document-mapper";
import { timeElapsedLogger } from "../../utils/time-elapsed-logger";
import { uuidGenerator } from "../../utils/uuid-generator";

export class OrchestrationService {
  static async processApplicationSubmission(
    eventBody: string,
    isLocal: boolean = false
  ) {
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
    let pdfDocumentMapper: PdfDocumentMapper;

    if (isLocal) {
      pdfDocumentMapper = new PdfDocumentMapper({
        rawFileName: "local-pdf-file",
        documentPath: path.join(process.cwd(), "/local")
      });
    } else {
      pdfDocumentMapper = new PdfDocumentMapper({
        rawFileName: uuidGenerator(),
        documentPath: "./tmp"
      });
    }
    PdfGenerationService.generatePdf(
      pdfDocumentMapper,
      applicationMarkupMapper
    );
    timeElapsedLogger(methodStartTime, "Generate PDF");

    // This block will not be used if this is locally called
    if (!isLocal) {
      await OrchestrationService.pushToAws(
        pdfDocumentMapper.documentPath,
        pdfDocumentMapper.fileName,
        pdfDocumentMapper.fileNameKey,
        applicationMarkupMapper
      );
    }

    // Event based?: Send email notifying managers of tenant about application

    // Log total run time
    timeElapsedLogger(totalMethodStartTime, "Total Method");
  }

  private static async pushToAws(
    documentPath: string,
    fileName: string,
    applicantId: string,
    applicationMarkupMapper: ApplicationMarkupMapper
  ) {
    // Push pdf to S3
    let methodStartTime = Date.now();
    await DocumentUploadService.uploadDocument(documentPath, fileName);
    timeElapsedLogger(methodStartTime, "Doc Upload");

    // Save pdf location and needed info to DDB
    await ApplicantUploadService.upload(applicantId, applicationMarkupMapper);
  }
}
