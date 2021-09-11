import { ApplicationField } from "../../models/application-field";
import { ApplicationFieldData } from "../../models/application-field-data";
import { ApplicationFormGroup } from "../../models/application-form-group";
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

    const applicationFormGroups: ApplicationFormGroup[] =
      await new DatabaseService().getApplicationFormGroups(
        applicationSubmission.applicationId
      );

    // Merge the two data sets together by their applicationFieldId
    const applicationFieldMap = new Map<string, ApplicationField>();
    applicationFields.forEach((applicationField: ApplicationField) =>
      applicationFieldMap.set(
        applicationField.applicationFieldId,
        applicationField
      )
    );

    const applicationMarkupFieldMap = new Map<string, ApplicationMarkupField>();

    applicationSubmission.applicationFieldData.forEach(
      (applicationFieldData: ApplicationFieldData) =>
        applicationMarkupFieldMap.set(applicationFieldData.applicationFieldId, {
          ...applicationFieldMap.get(applicationFieldData.applicationFieldId),
          inputFieldData: applicationFieldData.applicationFieldData
        })
    );

    // Create an array of correct attributes from the merged dataset objects
    const applicationMarkupFields: ApplicationMarkupField[] = Array.from(
      applicationMarkupFieldMap.values()
    );

    const applicationMarkupMapper: ApplicationMarkupMapper = {
      applicationId: applicationSubmission.applicationId,
      applicationFormGroups: Array.from(applicationFormGroups)
        .slice()
        .sort(this.sortBySequence),
      applicationInputFields: this.createInputNamesMap(applicationMarkupFields),
      applicationMarkupFields
    };

    return applicationMarkupMapper;
  }

  private static createInputNamesMap(
    applicationMarkupFields: ApplicationMarkupField[]
  ): Map<string, any> {
    const map = new Map();
    applicationMarkupFields.forEach(
      (applicationMarkupField: ApplicationMarkupField) =>
        map.set(applicationMarkupField.inputFieldName, applicationMarkupField)
    );
    return map;
  }

  private static sortBySequence(
    applicationFormGroupOne: ApplicationFormGroup,
    applicationFormGroupTwo: ApplicationFormGroup
  ): number {
    return applicationFormGroupOne.applicationFormGroupSequence >
      applicationFormGroupTwo.applicationFormGroupSequence
      ? 1
      : 0;
  }
}
