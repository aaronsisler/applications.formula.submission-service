import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { TopQuestionBottomAnswer } from "../../components/top-question-bottom-answer";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantResidencyDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Residency Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(
    InputFieldName.RESIDENCY_NC_RESIDENT
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField);

  currentField = applicationInputFields.get(
    InputFieldName.RESIDENCY_NC_OUTSIDE
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField);

  currentField = applicationInputFields.get(
    InputFieldName.RESIDENCY_NC_OUTSIDE_YES
  );
  pdfDocument = TopQuestionBottomAnswer(pdfDocument, currentField);

  return pdfDocument;
};
