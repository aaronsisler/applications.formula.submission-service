import PDFDocument from "pdfkit";
import fs from "fs";

import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";

export class PdfGenerationService {
  static generatePdf(applicationMarkupMapper: ApplicationMarkupMapper): any {
    const timeStamp: string = new Date(Date.now()).getTime().toString();
    const fileName = `${timeStamp}.pdf`;
    const documentPath = `/tmp/${fileName}`;

    const pdfDocument = new PDFDocument({ margin: 50 });
    pdfDocument.pipe(fs.createWriteStream(documentPath));
    pdfDocument
      .text("My Sample PDF Document")
      .moveDown()
      .moveDown()
      .text("Is this after?");
    pdfDocument.end();

    return { documentPath, fileName };
  }
}
