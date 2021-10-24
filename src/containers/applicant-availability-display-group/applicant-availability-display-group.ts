import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantAvailabilityDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, ApplicationMarkupField>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Availability Information");
  pdfDocument.moveDown(0.75);

  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_SCHEDULE_DAYS
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10);

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_SCHEDULE_EVENINGS
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10);

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_SCHEDULE_NIGHTS
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10);

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_SCHEDULE_WEEKENDS
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10);

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_SCHEDULE_FULL_TIME
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10, true);

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_SCHEDULE_PART_TIME
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10);

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_EMPLOYED_ELSEWHERE
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10);

  currentField = applicationInputFields.get(
    InputFieldName.AVAILABILITY_EMPLOYED_ELSEWHERE_YES
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 75);

  return pdfDocument;
};
