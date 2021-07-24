import PDFDocument from "pdfkit";
import fs from "fs";

import { ApplicationSubmission } from "../../models/application-submission";

export class PdfGenerationService {
  static generatePdf(applicationSubmission: ApplicationSubmission): any {
    const timeStamp: string = new Date(Date.now()).getTime().toString();
    const fileName = `${timeStamp}.pdf`;
    const documentPath = `/tmp/${fileName}`;

    const pdfDocument = new PDFDocument({ margin: 50 });
    pdfDocument.pipe(fs.createWriteStream(documentPath));
    pdfDocument
      .text("My Sample PDF Document")
      .moveDown()
      .moveDown()
      .text(applicationSubmission.message)
      .moveDown()
      .moveDown()
      .text("Is this after?");
    pdfDocument.end();

    return { documentPath, fileName };
  }
}
