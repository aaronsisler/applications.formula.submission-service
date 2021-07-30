import { DatabaseService } from "../database-service";
import { ApplicantSubmission } from "../../models/applicant-submission";
import { ApplicationMarkupField } from "../../models/application-markup-field";
import { ApplicationMarkupMapper } from "../../models/application-markup-mapper";
import { InputFieldType } from "../../models/input-field-type";
import { timeStampBuilder } from "../../utils/time-stamp-builder";

export class ApplicantUploadService {
  static async upload(
    applicantId: string,
    applicationMarkupMapper: ApplicationMarkupMapper
  ): Promise<void> {
    const applicantSubmission = new ApplicantSubmission({
      applicationId: applicationMarkupMapper.applicationId,
      applicantId: applicantId,
      applicantName: this.buildApplicantName(applicationMarkupMapper),
      dateSubmitted: timeStampBuilder()
    });

    await new DatabaseService().uploadApplicant(applicantSubmission);
  }

  private static buildApplicantName(
    applicationMarkupMapper: ApplicationMarkupMapper
  ): string {
    const lastName = this.extractApplicantFieldData(
      applicationMarkupMapper,
      InputFieldType.NAME__LAST
    );

    const firstName = this.extractApplicantFieldData(
      applicationMarkupMapper,
      InputFieldType.NAME__FIRST
    );

    return `${lastName}, ${firstName}`;
  }

  private static extractApplicantFieldData(
    applicationMarkupMapper: ApplicationMarkupMapper,
    inputFieldType: InputFieldType
  ): string {
    return applicationMarkupMapper.applicationMarkupFields.find(
      (applicationMarkupField: ApplicationMarkupField) =>
        applicationMarkupField.inputFieldType === inputFieldType
    ).applicationMarkupFieldData;
  }
}
