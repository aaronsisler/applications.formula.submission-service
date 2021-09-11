import { ApplicationFormGroup } from "./application-form-group";
import { ApplicationMarkupField } from "./application-markup-field";

export interface ApplicationMarkupMapper {
  applicationId: string;
  applicationFormGroups: ApplicationFormGroup[];
  applicationInputFields: Map<string, any>;
  applicationMarkupFields: ApplicationMarkupField[];
}
