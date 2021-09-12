import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfCharacters } from "../../models/pdf-characters";
import { buildHeader, padRight } from "../../utils/pdf-utils";
import { PdfStyles } from "../../models/pdf-styles";

export const ApplicantCrimeDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Crime Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(InputFieldName.CRIME_CONVICTED);
  pdfDocument.text(currentField.inputFieldLabel, { continued: false });
  pdfDocument.moveDown(0.75);

  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData, 7),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(InputFieldName.CRIME_CONVICTED_YES);
  pdfDocument.text(currentField.inputFieldLabel, { continued: false });
  pdfDocument.moveDown(0.75);

  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 140),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();

  return pdfDocument;
};
