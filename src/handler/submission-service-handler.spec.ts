import { handler } from "./index";

describe("handler/SubmissionServiceHandler", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof handler).toEqual("function");
  });
});
