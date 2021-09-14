import PDFDocument from "pdfkit";

import { SideBySideQuestionAndAnswer } from "../../components/side-by-side-question-and-answer";
import { TopQuestionBottomAnswer } from "../../components/top-question-bottom-answer";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { buildHeader } from "../../utils/pdf-utils";

export const ApplicantMedicalDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Medical Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_CONDITIONS);
  pdfDocument = TopQuestionBottomAnswer(pdfDocument, currentField);

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_MEDICATIONS);
  pdfDocument = TopQuestionBottomAnswer(pdfDocument, currentField);

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_SMOKE);
  pdfDocument = SideBySideQuestionAndAnswer(pdfDocument, currentField);

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_ALCOHOL);
  pdfDocument = SideBySideQuestionAndAnswer(pdfDocument, currentField);

  return pdfDocument;
};
