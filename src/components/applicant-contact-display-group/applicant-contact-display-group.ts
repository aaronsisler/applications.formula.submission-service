import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfStyles } from "../../models/pdf-styles";
import { padRight } from "../../utils/pdf-utils";

export const ApplicantContactDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupFields: ApplicationMarkupField[]
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument.text("Applicant Contact Information");
  pdfDocument.moveDown();
  const mappedFields = contactMapper(applicationMarkupFields);
  let currentField: ApplicationMarkupField;

  if (mappedFields.has(InputFieldName.CONTACT_PHONE_CELL)) {
    currentField = mappedFields.get(InputFieldName.CONTACT_PHONE_CELL);
    pdfDocument
      .text(currentField.inputFieldLabel, { continued: true })
      .text(PdfStyles.COLON, {
        continued: true,
        underline: false
      })
      .text(PdfStyles.SPACE_DOUBLE, {
        continued: true,
        underline: true
      })
      .text(
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 20),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: false });
  }

  if (mappedFields.has(InputFieldName.CONTACT_PHONE_HOME)) {
    currentField = mappedFields.get(InputFieldName.CONTACT_PHONE_HOME);
    pdfDocument
      .text(currentField.inputFieldLabel, { continued: true, underline: false })
      .text(PdfStyles.COLON, {
        continued: true,
        underline: false
      })
      .text(PdfStyles.SPACE_DOUBLE, {
        continued: true,
        underline: true
      })
      .text(
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 20),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.EMPTY_STRING, { underline: true });
  }

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.5);

  if (mappedFields.has(InputFieldName.CONTACT_EMAIL)) {
    currentField = mappedFields.get(InputFieldName.CONTACT_EMAIL);
    pdfDocument
      .text(currentField.inputFieldLabel, { continued: true, underline: false })
      .text(PdfStyles.COLON, {
        continued: true,
        underline: false
      })
      .text(PdfStyles.SPACE_DOUBLE, {
        continued: true,
        underline: true
      })
      .text(
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 50),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: true })
      .text(PdfStyles.EMPTY_STRING, { underline: true });
  }

  pdfDocument.moveDown();
  pdfDocument.moveDown();
  pdfDocument.text("Emergency Contact Information");
  pdfDocument.moveDown(0.75);

  if (mappedFields.has(InputFieldName.CONTACT_EMERGENCY_NAME)) {
    currentField = mappedFields.get(InputFieldName.CONTACT_EMERGENCY_NAME);
    pdfDocument
      .text(currentField.inputFieldLabel, { continued: true })
      .text(PdfStyles.COLON, {
        continued: true,
        underline: false
      })
      .text(PdfStyles.SPACE_DOUBLE, {
        continued: true,
        underline: true
      })
      .text(
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 50),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: false });
  }

  if (mappedFields.has(InputFieldName.CONTACT_EMERGENCY_PHONE)) {
    currentField = mappedFields.get(InputFieldName.CONTACT_EMERGENCY_PHONE);
    pdfDocument
      .text(currentField.inputFieldLabel, { continued: true, underline: false })
      .text(PdfStyles.COLON, {
        continued: true,
        underline: false
      })
      .text(PdfStyles.SPACE_DOUBLE, {
        continued: true,
        underline: true
      })
      .text(
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 20),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.EMPTY_STRING, { underline: true });
  }

  pdfDocument.moveDown();
  pdfDocument.moveDown();
  pdfDocument.text("End of Applicant Contact Information");

  return pdfDocument;
};

const contactMapper = (
  applicationMarkupFields: ApplicationMarkupField[]
): Map<string, any> => {
  const map = new Map();
  applicationMarkupFields.forEach(
    (applicationMarkupField: ApplicationMarkupField) =>
      map.set(applicationMarkupField.inputFieldName, applicationMarkupField)
  );
  return map;
};
