import PDFDocument from "pdfkit";
import fs from "fs";

import { ApplicantAddressDisplayGroup } from "../../containers/applicant-address-display-group";
import { ApplicantContactDisplayGroup } from "../../containers/applicant-contact-display-group";
import { ApplicantCrimeDisplayGroup } from "../../containers/applicant-crime-display-group";
import { ApplicantMedicalDisplayGroup } from "../../containers/applicant-medical-display-group";
import { ApplicantNameDisplayGroup } from "../../containers/applicant-name-display-group";
import { ApplicantResidencyDisplayGroup } from "../../containers/applicant-residency-display-group";
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
          // case FormGroupType.APPLICANT_NAME:
          //   return ApplicantNameDisplayGroup(
          //     pdfDocument,
          //     applicationMarkupMapper.applicationInputFields
          //   );
          // case FormGroupType.APPLICANT_ADDRESS:
          //   return ApplicantAddressDisplayGroup(
          //     pdfDocument,
          //     applicationMarkupMapper.applicationInputFields
          //   );
          // case FormGroupType.APPLICANT_CONTACT:
          //   return ApplicantContactDisplayGroup(
          //     pdfDocument,
          //     applicationMarkupMapper.applicationInputFields
          //   );
          case FormGroupType.APPLICANT_MEDICAL:
            pdfDocument.moveDown();
            return ApplicantMedicalDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_RESIDENCY:
            // Leaving this "on" is causing double spacing for some reason
            // pdfDocument.moveDown();
            return ApplicantResidencyDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_CRIME:
            pdfDocument.moveDown();
            return ApplicantCrimeDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
        }
      }
    );

    pdfDocument.end();
  }
}
