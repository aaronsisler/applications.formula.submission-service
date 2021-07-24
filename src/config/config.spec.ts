import * as config from "./index";

describe("config", () => {
  let configKeys: string[];

  beforeEach(() => {
    configKeys = Object.keys(config);
  });

  it("should export the correct keys", () => {
    expect(configKeys).toContain("S3_UPLOAD_BUCKET_NAME");
  });

  it("should export the correct values", () => {
    expect(config.S3_UPLOAD_BUCKET_NAME).toBeDefined();
  });
});
