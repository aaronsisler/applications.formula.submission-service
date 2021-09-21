import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { PdfCharacters } from "../../models/pdf-characters";
import { PdfDocumentConfig } from "../../models/pdf-document-config";
import { PdfStyles } from "../../models/pdf-styles";

export const TopQuestionBottomAnswer = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupField: ApplicationMarkupField
): typeof PDFDocument => {
  pdfDocument.text(applicationMarkupField.inputFieldLabel, {
    continued: false
  });
  pdfDocument.moveDown(0.75);

  pdfDocument.text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED);
  pdfDocument.text(
    applicationMarkupField.inputFieldData || PdfCharacters.EMPTY_STRING,
    PdfStyles.CONTINUED
  );

  pdfDocument.text(PdfCharacters.EMPTY_STRING, {
    continued: false,
    underline: false
  });

  const height = pdfDocument.heightOfString("a");
  const roundedHeightOffset = height - PdfDocumentConfig.LINE_POSITION_OFFSET;

  pdfDocument
    .lineWidth(PdfDocumentConfig.LINE_THICKNESS)
    .moveTo(pdfDocument.x, pdfDocument.y + roundedHeightOffset)
    .lineTo(
      pdfDocument.page.width - PdfDocumentConfig.LINE_END_MARGIN,
      pdfDocument.y + roundedHeightOffset
    )
    .stroke(PdfDocumentConfig.LINE_COLOR);

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  return pdfDocument;
};
