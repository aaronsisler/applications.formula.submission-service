import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfCharacters } from "../../models/pdf-characters";
import { PdfStyles } from "../../models/pdf-styles";
import { buildHeader, padRight } from "../../utils/pdf-utils";

export const ApplicantNameDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Name Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(InputFieldName.NAME__LAST);
  pdfDocument
    .text(currentField.inputFieldLabel, { continued: true })
    .text(PdfCharacters.COLON, PdfStyles.CONTINUED_NOT_UNDERLINED)
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 45),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_NOT_UNDERLINED);

  currentField = applicationInputFields.get(InputFieldName.NAME__FIRST);
  pdfDocument
    .text(currentField.inputFieldLabel, PdfStyles.CONTINUED_NOT_UNDERLINED)
    .text(PdfCharacters.COLON, PdfStyles.CONTINUED_NOT_UNDERLINED)
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 45),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, {
      underline: true
    });

  pdfDocument.moveDown(1.5);

  return pdfDocument;
};
