import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { ApplicationSubmission } from "../../models/application-submission";

export class ApplicationMapperService {
  static mapApplicationSubmission(
    applicationSubmission: ApplicationSubmission
  ): ApplicationMarkupMapper {
    // Get a submission from app with:
    // Application Id
    // Array with objects containing:
    // ApplicationFieldId
    // Value from the actual app submission
    // -------------------------------------
    // Retrieve the list of applicaiton fields from DDB using Application Id:
    // Sequence number for ordering
    // Type for mapping to markup

    const applicationMarkupMapper: ApplicationMarkupMapper = {};

    return applicationMarkupMapper;
  }
}
