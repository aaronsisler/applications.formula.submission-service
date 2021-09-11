import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfCharacters } from "../../models/pdf-characters";
import { buildHeader, padRight } from "../../utils/pdf-utils";

export const ApplicantContactDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationInputFields: Map<string, any>
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html

  pdfDocument = buildHeader(pdfDocument, "Applicant Contact Information");
  pdfDocument.moveDown(0.75);
  let currentField: ApplicationMarkupField;

  currentField = applicationInputFields.get(InputFieldName.CONTACT_PHONE_CELL);
  pdfDocument
    .text(currentField.inputFieldLabel, { continued: true })
    .text(PdfCharacters.COLON, {
      continued: true,
      underline: false
    })
    .text(PdfCharacters.SPACE_DOUBLE, {
      continued: true,
      underline: true
    })
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 20),
      {
        continued: true,
        underline: true
      }
    )
    .text(PdfCharacters.SPACE_DOUBLE, { continued: true, underline: false });

  currentField = applicationInputFields.get(InputFieldName.CONTACT_PHONE_HOME);
  pdfDocument
    .text(currentField.inputFieldLabel, { continued: true, underline: false })
    .text(PdfCharacters.COLON, {
      continued: true,
      underline: false
    })
    .text(PdfCharacters.SPACE_DOUBLE, {
      continued: true,
      underline: true
    })
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 20),
      {
        continued: true,
        underline: true
      }
    )
    .text(PdfCharacters.EMPTY_STRING, { underline: true });

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.5);

  currentField = applicationInputFields.get(InputFieldName.CONTACT_EMAIL);
  pdfDocument
    .text(currentField.inputFieldLabel, { continued: true, underline: false })
    .text(PdfCharacters.COLON, {
      continued: true,
      underline: false
    })
    .text(PdfCharacters.SPACE_DOUBLE, {
      continued: true,
      underline: true
    })
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 50),
      {
        continued: true,
        underline: true
      }
    )
    .text(PdfCharacters.SPACE_DOUBLE, { continued: true, underline: true })
    .text(PdfCharacters.EMPTY_STRING, { underline: true });

  pdfDocument.moveDown();
  pdfDocument.moveDown(1.5);
  pdfDocument = buildHeader(pdfDocument, "Emergency Contact Information");
  pdfDocument.moveDown(0.75);

  currentField = applicationInputFields.get(
    InputFieldName.CONTACT_EMERGENCY_NAME
  );
  pdfDocument
    .text(currentField.inputFieldLabel, { continued: true })
    .text(PdfCharacters.COLON, {
      continued: true,
      underline: false
    })
    .text(PdfCharacters.SPACE_DOUBLE, {
      continued: true,
      underline: true
    })
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 50),
      {
        continued: true,
        underline: true
      }
    )
    .text(PdfCharacters.SPACE_DOUBLE, { continued: true, underline: false });

  currentField = applicationInputFields.get(
    InputFieldName.CONTACT_EMERGENCY_PHONE
  );
  pdfDocument
    .text(currentField.inputFieldLabel, { continued: true, underline: false })
    .text(PdfCharacters.COLON, {
      continued: true,
      underline: false
    })
    .text(PdfCharacters.SPACE_DOUBLE, {
      continued: true,
      underline: true
    })
    .text(
      padRight(currentField.inputFieldData || PdfCharacters.EMPTY_STRING, 20),
      {
        continued: true,
        underline: true
      }
    )
    .text(PdfCharacters.EMPTY_STRING, { underline: true });

  pdfDocument.moveDown(1.5);

  return pdfDocument;
};
