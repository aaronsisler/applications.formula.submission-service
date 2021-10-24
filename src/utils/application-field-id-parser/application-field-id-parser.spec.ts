import { applicationFieldIdParser } from "./index";

describe("utils/Application Field ID Parser", () => {
  let applicationFieldId: string;

  beforeEach(() => {
    applicationFieldId = "mock-body#mock-suffix";
  });

  it("should be a function", () => {
    expect(typeof applicationFieldIdParser).toEqual("function");
  });

  describe("when an application field id does have a suffix", () => {
    it("should parse the application field id correctly", () => {
      const result = applicationFieldIdParser(applicationFieldId);

      expect(result).toEqual("mock-body");
    });
  });

  describe("when an application field id does NOT have a suffix", () => {
    it("should parse the application field id correctly", () => {
      const result = applicationFieldIdParser(applicationFieldId);

      expect(result).toEqual("mock-body");
    });
  });
});
