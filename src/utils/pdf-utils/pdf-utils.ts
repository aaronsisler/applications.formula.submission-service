import PDFDocument from "pdfkit";

import { PdfCharacters } from "../../models/pdf-characters";
import { PdfFontSizes } from "../../models/pdf-font-sizes";

export const padRight = (input: string, length: number): string => {
  const paddedRight =
    input + PdfCharacters.SPACE_SINGLE.repeat(length - input.length);

  return paddedRight;
};

export const buildHeader = (
  pdfDocument: typeof PDFDocument,
  input: string,
  fontSize: number = PdfFontSizes.FONT_SIZE_HEADING
): typeof PDFDocument => {
  return pdfDocument
    .fontSize(fontSize)
    .text(input)
    .fontSize(PdfFontSizes.FONT_SIZE_DEFAULT);
};

export const buildNumericConversion = (input: string): string => {
  switch (input) {
    case "4":
      return "Daily";
    case "3":
      return "Weekly";
    case "2":
      return "Monthly";
    case "1":
      return "Socially";
    case "0":
      return "None";
  }
};
