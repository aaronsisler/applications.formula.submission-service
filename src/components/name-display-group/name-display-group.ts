import PDFDocument from "pdfkit";

import { ApplicationMarkupField } from "../../models/application-markup-field";

export const NameDisplayGroup = (
  pdfDocument: typeof PDFDocument,
  applicationMarkupFields: ApplicationMarkupField[]
): typeof PDFDocument => {
  pdfDocument.text("Name Information");
  pdfDocument.moveDown().moveDown();
  const mappedFields = nameMapper(applicationMarkupFields);
  console.info("mappedFields");
  console.info(mappedFields);
  let currentField: ApplicationMarkupField;

  if (mappedFields.has("name,last")) {
    currentField = mappedFields.get("name,last");
    pdfDocument
      .text(currentField.inputFieldLabel, { continued: true })
      .text(": ", { continued: true })
      .text(currentField.inputFieldData || "");
    pdfDocument.moveDown().moveDown();
  }

  if (mappedFields.has("name,first")) {
    currentField = mappedFields.get("name,first");
    pdfDocument
      .text(currentField.inputFieldLabel, { continued: true })
      .text(": ", { continued: true })
      .text(currentField.inputFieldData || "");
    pdfDocument.moveDown().moveDown();
  }

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
