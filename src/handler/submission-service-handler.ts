import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Callback,
  Context
} from "aws-lambda";

import { HandlerResponse } from "../models/handler-response";
import { errorLogger } from "../utils/error-logger";
import { responseBodyBuilder } from "../utils/response-body-builder";

const submissionServiceHandler: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent,
  _context: Context,
  callback: Callback<APIGatewayProxyResult>
): Promise<APIGatewayProxyResult> => {
  try {
    const response: HandlerResponse = responseBodyBuilder(201, "Success");

    callback(null, response);
  } catch (error) {
    errorLogger("Handler/SubmissionServiceHandler", error);
    const response: HandlerResponse = responseBodyBuilder(500, "Failure");

    callback(null, response);
  } finally {
    return;
  }
};

export { submissionServiceHandler };
