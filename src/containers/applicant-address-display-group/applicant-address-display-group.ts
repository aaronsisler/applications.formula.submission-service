import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantAddressDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, ApplicationMarkupField>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Address Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(InputFieldName.ADDRESS_STREET);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 100);

  currentField = applicationInputFields.get(InputFieldName.ADDRESS_CITY);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 50, true);

  currentField = applicationInputFields.get(InputFieldName.ADDRESS_STATE);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 2 + 2, true);

  currentField = applicationInputFields.get(InputFieldName.ADDRESS_POSTAL_CODE);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 5 + 2);

  return pdfDocument;
};
