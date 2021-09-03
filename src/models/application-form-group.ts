import { FormGroupType } from "./form-group-type";

export class ApplicationFormGroup {
  applicationId: string;
  applicationFormGroupId: string;
  applicationFormGroupSequence: number;
  formGroupType: FormGroupType;

  constructor(options: {
    applicationId: string;
    applicationFormGroupId: string;
    applicationFormGroupSequence?: number;
    formGroupType?: FormGroupType;
  }) {
    this.applicationId = options.applicationId;
    this.applicationFormGroupId = options.applicationFormGroupId;
    this.applicationFormGroupSequence = options.applicationFormGroupSequence;
    this.formGroupType = options.formGroupType;
  }
}
