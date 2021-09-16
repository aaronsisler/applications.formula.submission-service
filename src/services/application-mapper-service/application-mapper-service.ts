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
    const applicationFormGroups: ApplicationFormGroup[] =
      await new DatabaseService().getApplicationFormGroups(
        applicationSubmission.applicationId
      );

    // Retrieve the list of application fields from DB using Application Id
    const applicationFields: ApplicationField[] =
      await new DatabaseService().getApplicationFields(
        applicationSubmission.applicationId
      );

    const applicationMarkupFieldMap = new Map<string, ApplicationMarkupField>();

    // Convert the list of application fields to a map
    applicationFields.forEach((applicationField: ApplicationField) =>
      applicationMarkupFieldMap.set(
        applicationField.applicationFieldId,
        applicationField
      )
    );

    // Merge the two data sets together by their applicationFieldId
    applicationSubmission.applicationFieldData.forEach(
      (applicationFieldData: ApplicationFieldData) =>
        applicationMarkupFieldMap.set(applicationFieldData.applicationFieldId, {
          ...applicationMarkupFieldMap.get(
            applicationFieldData.applicationFieldId
          ),
          inputFieldData: applicationFieldData.applicationFieldData
        })
    );

    // For Debugging
    const unusedFields = [];
    for (const key of applicationMarkupFieldMap.keys()) {
      if (applicationMarkupFieldMap.get(key).inputFieldData == undefined) {
        unusedFields.push(key);
      }
    }

    console.log("Logging any empty fields");
    console.log(unusedFields);

    const applicationMarkupMapper: ApplicationMarkupMapper = {
      applicationId: applicationSubmission.applicationId,
      applicationFormGroups: Array.from(applicationFormGroups)
        .slice()
        .sort(this.sortBySequence),
      applicationInputFields: applicationMarkupFieldMap
    };

    console.log("here");

    return applicationMarkupMapper;
  }

  private static sortBySequence(
    applicationFormGroupOne: ApplicationFormGroup,
    applicationFormGroupTwo: ApplicationFormGroup
  ): number {
    return applicationFormGroupOne.applicationFormGroupSequence >
      applicationFormGroupTwo.applicationFormGroupSequence
      ? 1
      : -1;
  }
}
