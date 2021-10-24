import PDFDocument from "pdfkit";
import fs from "fs";

import { ApplicantAddressDisplayGroup } from "../../containers/applicant-address-display-group";
import { ApplicantAvailabilityDisplayGroup } from "../../containers/applicant-availability-display-group";
import { ApplicantCertificationsDisplayGroup } from "../../containers/applicant-certifications-display-group";
import { ApplicantContactDisplayGroup } from "../../containers/applicant-contact-display-group";
import { ApplicantCrimeDisplayGroup } from "../../containers/applicant-crime-display-group";
import { ApplicantEducationDisplayGroup } from "../../containers/applicant-education-display-group";
import { ApplicantMedicalDisplayGroup } from "../../containers/applicant-medical-display-group";
import { ApplicantNameDisplayGroup } from "../../containers/applicant-name-display-group";
import { ApplicantPriorEmploymentDisplayGroup } from "../../containers/applicant-prior-employment-display-group";
import { ApplicantResidencyDisplayGroup } from "../../containers/applicant-residency-display-group";
import { ApplicantTransportationDisplayGroup } from "../../containers/applicant-transportation-display-group";
import { ApplicationFormGroup } from "../../models/application-form-group";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { FormGroupType } from "../../models/form-group-type";
import { PdfDocumentConfig } from "../../models/pdf-document-config";
import { PdfDocumentMapper } from "../../models/pdf-document-mapper";

export class PdfGenerationService {
  static generatePdf(
    pdfDocumentMapper: PdfDocumentMapper,
    applicationMarkupMapper: ApplicationMarkupMapper
  ): void {
    const pdfDocument = new PDFDocument({
      margin: PdfDocumentConfig.PAGE_MARGIN
    });

    pdfDocument.pipe(fs.createWriteStream(pdfDocumentMapper.documentPath));
    applicationMarkupMapper.applicationFormGroups.forEach(
      (applicationFormGroup: ApplicationFormGroup) => {
        pdfDocument.moveDown(0.5);
        switch (applicationFormGroup.formGroupType) {
          case FormGroupType.APPLICANT_NAME:
            return ApplicantNameDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_ADDRESS:
            return ApplicantAddressDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_CONTACT:
            return ApplicantContactDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_MEDICAL:
            return ApplicantMedicalDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_RESIDENCY:
            return ApplicantResidencyDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_CRIME:
            return ApplicantCrimeDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_TRANSPORTATION:
            return ApplicantTransportationDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_AVAILABILITY:
            return ApplicantAvailabilityDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_EDUCATION:
            return ApplicantEducationDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_CERTIFICATIONS:
            return ApplicantCertificationsDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
          case FormGroupType.APPLICANT_PRIOR_EMPLOYMENT:
            return ApplicantPriorEmploymentDisplayGroup(
              pdfDocument,
              applicationMarkupMapper.applicationInputFields
            );
        }
      }
    );

    pdfDocument.end();
  }
}
