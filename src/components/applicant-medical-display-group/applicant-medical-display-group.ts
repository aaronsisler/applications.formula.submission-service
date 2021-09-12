import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfCharacters } from "../../models/pdf-characters";
import {
  buildHeader,
  buildNumericConversion,
  padRight
} from "../../utils/pdf-utils";
import { PdfStyles } from "../../models/pdf-styles";

export const ApplicantMedicalDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Medical Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;
  let convertedValue: string;

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_CONDITIONS);
  pdfDocument.text(currentField.inputFieldLabel, { continued: false });

  pdfDocument.moveDown(0.75);
  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 150),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_MEDICATIONS);
  pdfDocument.text(currentField.inputFieldLabel, { continued: false });
  pdfDocument.moveDown(0.75);
  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 150),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_SMOKE);
  pdfDocument.text(currentField.inputFieldLabel, { continued: true });

  convertedValue = buildNumericConversion(currentField.inputFieldData);
  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(padRight(convertedValue, 10), PdfStyles.CONTINUED_UNDERLINED)
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });
  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(InputFieldName.MEDICAL_ALCOHOL);
  pdfDocument.text(currentField.inputFieldLabel, { continued: true });
  convertedValue = buildNumericConversion(currentField.inputFieldData);
  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(padRight(convertedValue, 10), PdfStyles.CONTINUED_UNDERLINED)
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();

  return pdfDocument;
};
