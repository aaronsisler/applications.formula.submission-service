import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { PdfCharacters } from "../../models/pdf-characters";
import { PdfStyles } from "../../models/pdf-styles";
import { padRight } from "../../utils/pdf-utils";

export const SideBySideLabelAndValue = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupField: ApplicationMarkupField,
  fieldLength: number = 25,
  isContinued: boolean = false
): typeof PDFDocument => {
  pdfDocument.text(applicationMarkupField.inputFieldLabel, { continued: true });
  pdfDocument.text(PdfCharacters.COLON, PdfStyles.CONTINUED);

  pdfDocument.text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED);
  pdfDocument.text(
    padRight(applicationMarkupField.inputFieldData, fieldLength),
    PdfStyles.CONTINUED_UNDERLINED
  );

  if (isContinued) {
    pdfDocument.text(
      PdfCharacters.SPACE_DOUBLE,
      PdfStyles.CONTINUED_NOT_UNDERLINED
    );
  } else {
    pdfDocument.text(PdfCharacters.EMPTY_STRING, {
      continued: false,
      underline: false
    });
    pdfDocument.moveDown();
    pdfDocument.moveDown(0.5);
  }

  return pdfDocument;
};
