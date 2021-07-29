import { ApplicationMarkupField } from "./application-markup-field";

export interface ApplicationMarkupMapper {
  applicationId: string;
  applicationMarkupFields: ApplicationMarkupField[];
}
