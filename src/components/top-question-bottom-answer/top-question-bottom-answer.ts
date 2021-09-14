import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { PdfCharacters } from "../../models/pdf-characters";
import { PdfStyles } from "../../models/pdf-styles";
import { padRight } from "../../utils/pdf-utils";

export const TopQuestionBottomAnswer = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupField: ApplicationMarkupField
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument.text(applicationMarkupField.inputFieldLabel, {
    continued: false
  });
  pdfDocument.moveDown(0.75);

  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(
        applicationMarkupField.inputFieldData || PdfCharacters.EMPTY_STRING,
        140
      ),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();

  return pdfDocument;
};
