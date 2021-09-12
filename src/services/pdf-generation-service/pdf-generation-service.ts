import PDFDocument from "pdfkit";
import fs from "fs";

import { ApplicantAddressDisplayGroup } from "../../components/applicant-address-display-group";
import { ApplicantContactDisplayGroup } from "../../components/applicant-contact-display-group";
import { ApplicantCrimeDisplayGroup } from "../../components/applicant-crime-display-group";
import { ApplicantMedicalDisplayGroup } from "../../components/applicant-medical-display-group";
import { ApplicantNameDisplayGroup } from "../../components/applicant-name-display-group";
import { ApplicantResidencyDisplayGroup } from "../../components/applicant-residency-display-group";
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
        console.log(applicationFormGroup.formGroupType);
        console.log(applicationFormGroup.applicationFormGroupSequence);
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
