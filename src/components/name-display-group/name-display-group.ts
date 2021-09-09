import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";
import { InputFieldName } from "../../models/input-field-name";
import { PdfStyles } from "../../models/pdf-styles";
import { padRight } from "../../utils/pdf-utils";

export const NameDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupFields: ApplicationMarkupField[]
): typeof PDFDocument => {
  // TODO Make this bold and import font types
  // http://pdfkit.org/docs/text.html
  pdfDocument.text("Name Information");
  pdfDocument.moveDown();
  const mappedFields = nameMapper(applicationMarkupFields);
  let currentField: ApplicationMarkupField;

  if (mappedFields.has(InputFieldName.NAME__LAST)) {
    currentField = mappedFields.get(InputFieldName.NAME__LAST);
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
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 45),
        {
          continued: true,
          underline: true
        }
      )

      .text(PdfStyles.SPACE_DOUBLE, { continued: true, underline: false });
  }

  if (mappedFields.has(InputFieldName.NAME__FIRST)) {
    currentField = mappedFields.get(InputFieldName.NAME__FIRST);
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
        padRight(currentField.inputFieldData || PdfStyles.EMPTY_STRING, 45),
        {
          continued: true,
          underline: true
        }
      )
      .text(PdfStyles.EMPTY_STRING, {
        underline: true
      });
  }

  pdfDocument.moveDown();
  pdfDocument.moveDown();
  pdfDocument.text("End of Name Information");

  return pdfDocument;
};

const nameMapper = (
  applicationMarkupFields: ApplicationMarkupField[]
): Map<string, any> => {
  const map = new Map();
  applicationMarkupFields.forEach(
    (applicationMarkupField: ApplicationMarkupField) =>
      map.set(applicationMarkupField.inputFieldName, applicationMarkupField)
  );
  return map;
};
