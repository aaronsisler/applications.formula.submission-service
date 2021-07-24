import { ApplicationFieldData } from "./application-field-data";

export interface ApplicationSubmission {
  message: string;
  applicationId: string;
  applicationFieldData: ApplicationFieldData[];
}
