import { InputFieldType } from "./input-field-type";

export interface ApplicationMarkupField {
  applicationSequence: number;
  applicationMarkupFieldLabel: string;
  applicationMarkupFieldData: any;
  inputFieldType: InputFieldType;
}
