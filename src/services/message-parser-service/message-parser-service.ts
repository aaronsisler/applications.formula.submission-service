import { isStringEmpty } from "../../utils/string-utils";
import { ApplicationSubmission } from "../../models/application-submission";

export class MessageParserService {
  static parseMessage(message: string): ApplicationSubmission {
    if (isStringEmpty(message)) {
      throw new Error("Message is empty");
    }

    try {
      const applicationSubmission: ApplicationSubmission = JSON.parse(message);

      return applicationSubmission;
    } catch (error) {
      throw new Error("Message could not be parsed correctly");
    }
  }
}
