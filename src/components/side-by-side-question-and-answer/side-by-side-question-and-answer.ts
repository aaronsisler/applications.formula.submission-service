import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { PdfCharacters } from "../../models/pdf-characters";
import { PdfStyles } from "../../models/pdf-styles";
import { padRight } from "../../utils/pdf-utils";

export const SideBySideQuestionAndAnswer = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupField: ApplicationMarkupField
): typeof PDFDocument => {
  pdfDocument.text(applicationMarkupField.inputFieldLabel, { continued: true });

  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(applicationMarkupField.inputFieldData, 10),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  return pdfDocument;
};
