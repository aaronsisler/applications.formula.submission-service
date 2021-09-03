import { ApplicationFormGroup } from "./application-form-group";
import { ApplicationMarkupField } from "./application-markup-field";

export interface ApplicationMarkupMapper {
  applicationId: string;
  applicationFormGroups: ApplicationFormGroup[];
  applicationMarkupFields: ApplicationMarkupField[];
}
