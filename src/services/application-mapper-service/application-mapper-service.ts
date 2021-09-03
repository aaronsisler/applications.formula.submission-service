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
    console.info("applicationFields");
    console.info(applicationFields);

    const applicationFormGroups: ApplicationFormGroup[] =
      await new DatabaseService().getApplicationFormGroups(
        applicationSubmission.applicationId
      );
    console.info("applicationFormGroups");
    console.info(applicationFormGroups);

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
    console.info("applicationMarkupFieldMap");
    console.info(applicationMarkupFieldMap);

    // Create an array of correct attributes from the merged dataset objects
    const applicationMarkupFields: ApplicationMarkupField[] = Array.from(
      applicationMarkupFieldMap.values()
    );
    console.info("applicationMarkupFields");
    console.info(applicationMarkupFields);

    const applicationMarkupMapper: ApplicationMarkupMapper = {
      applicationId: applicationSubmission.applicationId,
      applicationFormGroups: Array.from(applicationFormGroups)
        .slice()
        .sort(this.sortBySequence),
      applicationMarkupFields
    };

    console.info("applicationMarkupMapper");
    console.info(applicationMarkupMapper);

    return applicationMarkupMapper;
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
