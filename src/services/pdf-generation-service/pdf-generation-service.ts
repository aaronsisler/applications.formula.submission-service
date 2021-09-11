import PDFDocument from "pdfkit";
import fs from "fs";

import { ApplicantAddressDisplayGroup } from "../../components/applicant-address-display-group";
import { ApplicantContactDisplayGroup } from "../../components/applicant-contact-display-group";
import { ApplicantNameDisplayGroup } from "../../components/applicant-name-display-group";
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
        pdfDocument.moveDown();
        switch (applicationFormGroup.formGroupType) {
          case FormGroupType.APPLICANT_NAME:
            return ApplicantNameDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationMarkupFields
            );
          case FormGroupType.APPLICANT_ADDRESS:
            return ApplicantAddressDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationMarkupFields
            );
          case FormGroupType.APPLICANT_CONTACT:
            return ApplicantContactDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationMarkupFields
            );
        }
      }
    );

    pdfDocument.end();
  }
}
