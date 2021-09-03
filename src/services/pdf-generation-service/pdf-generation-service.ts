import PDFDocument from "pdfkit";
import fs from "fs";

import { NameDisplayGroup } from "../../components/name-display-group/name-display-group";
import { ApplicationFormGroup } from "../../models/application-form-group";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { FormGroupType } from "../../models/form-group-type";

export class PdfGenerationService {
  static generatePdf(
    rawFileName: string,
    applicationMarkupMapper: ApplicationMarkupMapper
  ): any {
    const fileName = `${rawFileName}.pdf`;
    const documentPath = `/tmp/${fileName}`;

    const pdfDocument = new PDFDocument({ margin: 50 });
    pdfDocument.pipe(fs.createWriteStream(documentPath));
    pdfDocument.text("My Sample PDF Document");
    pdfDocument.moveDown().moveDown();
    applicationMarkupMapper.applicationFormGroups.forEach(
      (applicationFormGroup: ApplicationFormGroup) => {
        console.log("applicationFormGroup");
        console.log(applicationFormGroup);
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

    return { documentPath, fileName };
  }
}
