import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfStyles } from "../../models/pdf-styles";
import { padRight } from "../../utils/pdf-utils";

export const ApplicantAddressDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupFields: ApplicationMarkupField[]
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument.text("Applicant Address Information");
  pdfDocument.moveDown();
  const mappedFields = addressMapper(applicationMarkupFields);
  let currentField: ApplicationMarkupField;

  if (mappedFields.has(InputFieldName.ADDRESS_STREET)) {
    currentField = mappedFields.get(InputFieldName.ADDRESS_STREET);
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
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 85),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.EMPTY_STRING, { underline: true });
  }

  pdfDocument.moveDown();
  pdfDocument.moveDown(0.5);

  if (mappedFields.has(InputFieldName.ADDRESS_CITY)) {
    currentField = mappedFields.get(InputFieldName.ADDRESS_CITY);
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
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 65),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: false });
  }

  if (mappedFields.has(InputFieldName.ADDRESS_STATE)) {
    currentField = mappedFields.get(InputFieldName.ADDRESS_STATE);
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
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 2),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: true })
      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: false });
  }

  if (mappedFields.has(InputFieldName.ADDRESS_POSTAL_CODE)) {
    currentField = mappedFields.get(InputFieldName.ADDRESS_POSTAL_CODE);
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
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 5),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: true })
      .text(PdfStyles.EMPTY_STRING, { underline: false });
  }

  pdfDocument.moveDown();
  pdfDocument.moveDown();
  pdfDocument.text("End of Applicant Address Information");

  return pdfDocument;
};

const addressMapper = (
  applicationMarkupFields: ApplicationMarkupField[]
): Map<string, any> => {
  const map = new Map();
  applicationMarkupFields.forEach(
    (applicationMarkupField: ApplicationMarkupField) =>
      map.set(applicationMarkupField.inputFieldName, applicationMarkupField)
  );
  return map;
};
