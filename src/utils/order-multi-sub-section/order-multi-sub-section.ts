import { ApplicationMarkupField } from "../../models/application-markup-field";
import { applicationFieldIdParser } from "../../utils/application-field-id-parser";

export const orderMultiSubSection = (
  applicationMarkupFields: ApplicationMarkupField[],
  applicationInputFieldsOrder: string[]
): ApplicationMarkupField[] => {
  const orderedMultiSectionFields: ApplicationMarkupField[] = [];
  const maxSequence: number = maxSequenceNumber(applicationMarkupFields);
  for (let index = 1; index <= maxSequence; index++) {
    applicationInputFieldsOrder.forEach((applicationOrderKey: string) => {
      const applicationMarkupField: ApplicationMarkupField =
        findApplicationMarkupField(
          applicationMarkupFields,
          applicationOrderKey,
          index
        );

      orderedMultiSectionFields.push(applicationMarkupField);
    });
  }

  return orderedMultiSectionFields;
};

const findApplicationMarkupField = (
  applicationMarkupFields: ApplicationMarkupField[],
  applicationOrderKey: string,
  currentIndex: number
): ApplicationMarkupField =>
  applicationMarkupFields.find(
    (applicationMarkupField: ApplicationMarkupField) =>
      applicationOrderKey ==
        applicationFieldIdParser(applicationMarkupField.applicationFieldId) &&
      applicationMarkupField.applicationFieldSequence == currentIndex
  );

const maxSequenceNumber = (
  applicationMarkupFields: ApplicationMarkupField[]
): number =>
  applicationMarkupFields[applicationMarkupFields.length - 1]
    .applicationFieldSequence;
