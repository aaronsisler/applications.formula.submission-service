import PDFDocument from "pdfkit";

import { PdfCharacters } from "../../models/pdf-characters";
import { PdfStyles } from "../../models/pdf-styles";

export const padRight = (input: string, length: number): string => {
  const paddedRight =
    input + PdfCharacters.SPACE_SINGLE.repeat(length - input.length);

  return paddedRight;
};

export const buildHeader = (
  pdfDocument: typeof PDFDocument,
  input: string,
  fontSize: number = PdfStyles.FONT_SIZE_HEADING
): typeof PDFDocument => {
  return pdfDocument
    .fontSize(fontSize)
    .text(input)
    .fontSize(PdfStyles.FONT_SIZE_DEFAULT);
};
