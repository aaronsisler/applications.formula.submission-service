import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { TopQuestionBottomAnswer } from "../../components/top-question-bottom-answer";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantCertificationsDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(
    pdfDocument,
    "Applicant Certifications Information"
  );
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(
    InputFieldName.CERTIFICATIONS_SELECT
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 75);

  currentField = applicationInputFields.get(
    InputFieldName.CERTIFICATIONS_OTHER
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 75);

  currentField = applicationInputFields.get(
    InputFieldName.CERTIFICATIONS_CURRENT_NOT_EXPIRED
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 75);

  currentField = applicationInputFields.get(
    InputFieldName.CERTIFICATIONS_RELEVANT_QUALIFICATIONS
  );
  pdfDocument = TopQuestionBottomAnswer(pdfDocument, currentField);

  return pdfDocument;
};
