import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantContactDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Contact Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(InputFieldName.CONTACT_PHONE_CELL);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 30, true);

  currentField = applicationInputFields.get(InputFieldName.CONTACT_PHONE_HOME);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 30);

  currentField = applicationInputFields.get(InputFieldName.CONTACT_EMAIL);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 75);

  pdfDocument = buildHeader(pdfDocument, "Emergency Contact Information");
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(
    InputFieldName.CONTACT_EMERGENCY_NAME
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 75);

  currentField = applicationInputFields.get(
    InputFieldName.CONTACT_EMERGENCY_PHONE
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 50);

  return pdfDocument;
};
