import { ApplicationMarkupField } from "../../models/application-markup-field";

const filterMultiSubSection = (
  applicationMarkupFields: Map<string, ApplicationMarkupField>,
  applicationInputFieldsPrefixFilter: string
): ApplicationMarkupField[] => {
  const filteredMultiSectionFields: ApplicationMarkupField[] = [];

  for (const value of applicationMarkupFields.values()) {
    if (
      value.applicationFieldId.startsWith(applicationInputFieldsPrefixFilter)
    ) {
      filteredMultiSectionFields.push(value);
    }
  }

  return filteredMultiSectionFields.sort(sortBySequence);
};

const sortBySequence = (
  applicationMarkupFieldOne: ApplicationMarkupField,
  applicationMarkupFieldTwo: ApplicationMarkupField
): number =>
  applicationMarkupFieldOne.applicationFieldSequence >
  applicationMarkupFieldTwo.applicationFieldSequence
    ? 1
    : -1;

export { filterMultiSubSection };
