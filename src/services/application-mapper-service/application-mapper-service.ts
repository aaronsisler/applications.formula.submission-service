import { ApplicationField } from "../../models/application-field";
import { ApplicationFieldData } from "../../models/application-field-data";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { ApplicationSubmission } from "../../models/application-submission";
import { DatabaseService } from "../database-service";

export class ApplicationMapperService {
  static async mapApplicationSubmission(
    applicationSubmission: ApplicationSubmission
  ): Promise<ApplicationMarkupMapper> {
    // Retrieve the list of application fields from DDB using Application Id
    const applicationFields: ApplicationField[] =
      await new DatabaseService().getApplicationFields(
        applicationSubmission.applicationId
      );

    // Merge the two data sets together by their applicationFieldId
    const map = new Map();
    applicationFields.forEach((applicationField: ApplicationField) =>
      map.set(applicationField.applicationFieldId, applicationField)
    );

    applicationSubmission.applicationFieldData.forEach(
      (applicationFieldData: ApplicationFieldData) =>
        map.set(applicationFieldData.applicationFieldId, {
          ...map.get(applicationFieldData.applicationFieldId),
          ...applicationFieldData
        })
    );

    // Create an array of correct attributes from the merged dataset objects
    const applicationMarkupFields: ApplicationMarkupField[] = Array.from(
      map.values()
    )
      .slice()
      .sort(this.sortBySequence)
      .map((item) => ({
        applicationSequence: item.applicationSequence,
        applicationMarkupFieldLabel: item.inputFieldLabel,
        applicationMarkupFieldData: item.applicationFieldData,
        inputFieldType: item.inputFieldType
      }));

    const applicationMarkupMapper: ApplicationMarkupMapper = {
      applicationMarkupFields
    };

    console.log(applicationMarkupFields);

    return applicationMarkupMapper;
  }

  private static sortBySequence(
    applicationFieldOne: ApplicationField,
    applicationFieldTwo: ApplicationField
  ): number {
    return applicationFieldOne.applicationSequence >
      applicationFieldTwo.applicationSequence
      ? 1
      : 0;
  }
}
