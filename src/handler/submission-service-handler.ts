import { Callback, Context, SQSEvent, SQSHandler } from "aws-lambda";
import { OrchestrationService } from "../services/orchestration-service";

import { errorLogger } from "../utils/error-logger";

const submissionServiceHandler: SQSHandler = async (
  event: SQSEvent,
  _context: Context,
  callback: Callback<void>
): Promise<void> => {
  try {
    // This is assuming the message/record will always come in one item.
    // Need to test as the application submission get larger
    const { body: eventBody }: { body: string } = event.Records[0];
    await OrchestrationService.processApplicationSubmission(eventBody);

    callback();
  } catch (error) {
    errorLogger("Handler/SubmissionServiceHandler", error);
    callback("Failure occurred. Sending to DLQ");
  } finally {
    return;
  }
};

export { submissionServiceHandler };
