import PDFDocument from "pdfkit";
import fs from "fs";

import { NameDisplayGroup } from "../../components/name-display-group/name-display-group";
import { ApplicationFormGroup } from "../../models/application-form-group";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { FormGroupType } from "../../models/form-group-type";
import { PdfDocumentMapper } from "../../models/pdf-document-mapper";

export class PdfGenerationService {
  static generatePdf(
    pdfDocumentMapper: PdfDocumentMapper,
    applicationMarkupMapper: ApplicationMarkupMapper
  ): void {
    const pdfDocument = new PDFDocument({ margin: 35 });

    pdfDocument.pipe(fs.createWriteStream(pdfDocumentMapper.documentPath));
    applicationMarkupMapper.applicationFormGroups.forEach(
      (applicationFormGroup: ApplicationFormGroup) => {
        switch (applicationFormGroup.formGroupType) {
          case FormGroupType.NAME:
            NameDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationMarkupFields
            );
        }
      }
    );

    pdfDocument.end();
  }
}
