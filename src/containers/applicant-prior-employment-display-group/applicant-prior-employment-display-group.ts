import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { SUB_SECTION_ORDERING_PRIOR_EMPLOYMENT } from "../../constants";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { applicationFieldIdParser } from "../../utils/application-field-id-parser";
import { filterMultiSubSection } from "../../utils/filter-multi-sub-section";
import { orderMultiSubSection } from "../../utils/order-multi-sub-section";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantPriorEmploymentDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupFields: Map<string, ApplicationMarkupField>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(
    pdfDocument,
    "Applicant Prior Employment Information"
  );
  pdfDocument.moveDown(0.75);

  const filteredApplicationMarkupFields: ApplicationMarkupField[] =
    filterMultiSubSection(
      applicationMarkupFields,
      InputFieldName.PRIOR_EMPLOYMENT_PREFIX
    );

  const orderedApplicationMarkupFields: ApplicationMarkupField[] =
    orderMultiSubSection(
      filteredApplicationMarkupFields,
      SUB_SECTION_ORDERING_PRIOR_EMPLOYMENT
    );

  orderedApplicationMarkupFields.map(
    (applicationMarkupField: ApplicationMarkupField) => {
      return buildApplicantPriorEmploymentSubSection(
        applicationMarkupField,
        pdfDocument
      );
    }
  );

  return pdfDocument;
};

const buildApplicantPriorEmploymentSubSection = (
  applicationMarkupField: ApplicationMarkupField,
  pdfDocument: typeof PDFDocument
): typeof PDFDocument => {
  const applcationFieldIdBody = applicationFieldIdParser(
    applicationMarkupField.applicationFieldId
  );
  switch (applcationFieldIdBody) {
    case InputFieldName.PRIOR_EMPLOYMENT_EMPLOYER_NAME:
      pdfDocument = SideBySideLabelAndValue(
        pdfDocument,
        applicationMarkupField,
        100
      );
      return pdfDocument.moveDown(0.75);
    case InputFieldName.PRIOR_EMPLOYMENT_EMPLOYER_ADDRESS:
      pdfDocument = SideBySideLabelAndValue(
        pdfDocument,
        applicationMarkupField,
        100
      );
      return pdfDocument.moveDown(0.75);
    case InputFieldName.PRIOR_EMPLOYMENT_EMPLOYER_CITY:
      pdfDocument = SideBySideLabelAndValue(
        pdfDocument,
        applicationMarkupField,
        50,
        true
      );
      break;
    case InputFieldName.PRIOR_EMPLOYMENT_EMPLOYER_STATE:
      pdfDocument = SideBySideLabelAndValue(
        pdfDocument,
        applicationMarkupField,
        2 + 2,
        true
      );
      break;
    case InputFieldName.PRIOR_EMPLOYMENT_EMPLOYER_POSTAL_CODE:
      pdfDocument = SideBySideLabelAndValue(
        pdfDocument,
        applicationMarkupField,
        5 + 2
      );
      return pdfDocument.moveDown(0.75);
    default:
      return pdfDocument;
  }
};
