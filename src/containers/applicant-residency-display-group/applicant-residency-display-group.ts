import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfCharacters } from "../../models/pdf-characters";
import { buildHeader, padRight } from "../../utils/pdf-utils";
import { PdfStyles } from "../../models/pdf-styles";

export const ApplicantResidencyDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument = buildHeader(pdfDocument, "Applicant Residency Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(
    InputFieldName.RESIDENCY_NC_RESIDENT
  );
  pdfDocument.text(currentField.inputFieldLabel, { continued: true });

  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData, 7),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });
  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(
    InputFieldName.RESIDENCY_NC_OUTSIDE
  );
  pdfDocument.text(currentField.inputFieldLabel, { continued: true });
  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData, 7),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(
    InputFieldName.RESIDENCY_NC_OUTSIDE_YES
  );
  pdfDocument.text(currentField.inputFieldLabel, { continued: false });

  pdfDocument.moveDown(0.75);
  pdfDocument
    .text(PdfCharacters.SPACE_DOUBLE, PdfStyles.CONTINUED_UNDERLINED)
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 120),
      PdfStyles.CONTINUED_UNDERLINED
    )
    .text(PdfCharacters.EMPTY_STRING, { continued: false, underline: false });

  pdfDocument.moveDown();

  return pdfDocument;
};
