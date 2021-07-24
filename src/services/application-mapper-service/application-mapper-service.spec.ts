import { ApplicationMapperService } from "./index";

describe("services/ApplicationMapperService", () => {
  let applicationMapperService: ApplicationMapperService;

  beforeEach(() => {
    applicationMapperService = new ApplicationMapperService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof ApplicationMapperService).toEqual("function");
    expect(typeof applicationMapperService).toEqual("object");
  });
});
