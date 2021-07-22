import { OrchestrationService } from "./index";

describe("services/OrchestrationService", () => {
  let orchestrationService: OrchestrationService;

  beforeEach(() => {
    orchestrationService = new OrchestrationService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof OrchestrationService).toEqual("function");
    expect(typeof orchestrationService).toEqual("object");
  });
});
