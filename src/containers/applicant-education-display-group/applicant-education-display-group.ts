import PDFDocument from "pdfkit";

import { SideBySideLabelAndValue } from "../../components/side-by-side-label-and-value";
import { TopQuestionBottomAnswer } from "../../components/top-question-bottom-answer";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfCharacters } from "../../models/pdf-characters";
import { PdfStyles } from "../../models/pdf-styles";
import { buildHeader, padRight } from "../../utils/pdf-utils";

export const ApplicantEducationDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Education Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(
    InputFieldName.EDUCATION_HIGH_SCHOOL_DIPLOMA
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10, true);

  currentField = applicationInputFields.get(
    InputFieldName.EDUCATION_HIGH_SCHOOL_LOCATION
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 45);

  currentField = applicationInputFields.get(InputFieldName.EDUCATION_GED);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10, true);

  currentField = applicationInputFields.get(
    InputFieldName.EDUCATION_GED_LOCATION
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 45);

  currentField = applicationInputFields.get(InputFieldName.EDUCATION_COLLEGE);
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 10, true);

  currentField = applicationInputFields.get(
    InputFieldName.EDUCATION_COLLEGE_LOCATION
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 75);

  currentField = applicationInputFields.get(
    InputFieldName.EDUCATION_COLLEGE_DEGREE
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 60, true);

  currentField = applicationInputFields.get(
    InputFieldName.EDUCATION_COLLEGE_GRADUATION_DATE
  );
  pdfDocument = SideBySideLabelAndValue(pdfDocument, currentField, 25);

  return pdfDocument;
};
