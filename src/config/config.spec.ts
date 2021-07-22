import * as config from "./index";

describe("config", () => {
  let configKeys: string[];

  beforeEach(() => {
    configKeys = Object.keys(config);
  });

  it("should export the correct keys", () => {
    expect(configKeys).toContain("TEST_CONFIG");
  });

  it("should export the correct values", () => {
    expect(config.TEST_CONFIG).toBeDefined();
  });
});
