import { Callback, Context, SQSEvent, SQSHandler } from "aws-lambda";
import { OrchestrationService } from "../services/orchestration-service";

import { errorLogger } from "../utils/error-logger";

const submissionServiceHandler: SQSHandler = async (
  event: SQSEvent,
  _context: Context,
  callback: Callback<void>
): Promise<void> => {
  try {
    const { body: eventBody }: { body: string } = event.Records[0];
    OrchestrationService.processApplicationSubmission(eventBody);

    callback();
  } catch (error) {
    errorLogger("Handler/SubmissionServiceHandler", error);
    callback("Failure occurred");
  } finally {
    return;
  }
};

export { submissionServiceHandler };
