import { ApplicationField } from "../../models/application-field";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { ApplicationSubmission } from "../../models/application-submission";
import { DatabaseService } from "../database-service";

export class ApplicationMapperService {
  static async mapApplicationSubmission(
    applicationSubmission: ApplicationSubmission
  ): Promise<ApplicationMarkupMapper> {
    // Get a submission from app with:
    // Application Id
    // Array with objects containing:
    // ApplicationFieldId
    // Value from the actual app submission
    // -------------------------------------
    // Retrieve the list of applicaiton fields from DDB using Application Id:
    // Sequence number for ordering
    // Type for mapping to markup
    const applicationFields: ApplicationField[] =
      await DatabaseService.getApplicationFields(
        applicationSubmission.applicationId
      );

    console.log(applicationFields);

    const applicationMarkupMapper: ApplicationMarkupMapper = {};

    return applicationMarkupMapper;
  }
}
