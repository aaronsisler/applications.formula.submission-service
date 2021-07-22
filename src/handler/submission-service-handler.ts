import { Callback, Context, SQSEvent, SQSHandler } from "aws-lambda";

import { errorLogger } from "../utils/error-logger";

const submissionServiceHandler: SQSHandler = async (
  event: SQSEvent,
  _context: Context,
  callback: Callback<void>
): Promise<void> => {
  try {
    console.log("Hi there");
    console.log(event);
    // callback();
  } catch (error) {
    // errorLogger("Handler/SubmissionServiceHandler", error);
    // callback();
  } finally {
    // return;
  }
  throw new Error("Kaboom")!;
};

export { submissionServiceHandler };
