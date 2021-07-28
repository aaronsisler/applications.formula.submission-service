import PDFDocument from "pdfkit";
import fs from "fs";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";

export class PdfGenerationService {
  static generatePdf(
    applicationMarkupMapper: ApplicationMarkupMapper,
    rawFileName: string
  ): any {
    const fileName = `${rawFileName}.pdf`;
    const documentPath = `/tmp/${fileName}`;

    const pdfDocument = new PDFDocument({ margin: 50 });
    pdfDocument.pipe(fs.createWriteStream(documentPath));
    pdfDocument.text("My Sample PDF Document");
    pdfDocument.moveDown().moveDown();
    applicationMarkupMapper.applicationMarkupFields.forEach(
      (applicationMarkupField: ApplicationMarkupField) => {
        const { applicationMarkupFieldData, applicationMarkupFieldLabel } =
          applicationMarkupField;
        pdfDocument
          .text(applicationMarkupFieldLabel, { continued: true })
          .text(": ", { continued: true })
          .text(applicationMarkupFieldData || "");
        applicationMarkupFieldData
          ? pdfDocument.moveDown()
          : pdfDocument.moveDown().moveDown();
      }
    );

    pdfDocument.text("Is this after?");
    pdfDocument.end();

    return { documentPath, fileName };
  }
}
