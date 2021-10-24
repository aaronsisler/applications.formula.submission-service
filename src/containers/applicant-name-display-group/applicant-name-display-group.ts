import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantNameDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, ApplicationMarkupField>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Name Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(InputFieldName.NAME__LAST);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 45, true);

  currentField = applicationInputFields.get(InputFieldName.NAME__FIRST);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 45);

  return pdfDocument;
};
