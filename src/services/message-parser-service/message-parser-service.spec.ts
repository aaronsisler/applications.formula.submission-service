import { MessageParserService } from "./index";

describe("services/MessageParserService", () => {
  let messageParserService: MessageParserService;

  beforeEach(() => {
    messageParserService = new MessageParserService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof MessageParserService).toEqual("function");
    expect(typeof messageParserService).toEqual("object");
  });
});
