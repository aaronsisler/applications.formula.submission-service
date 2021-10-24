import * as constants from "./index";

describe("constants", () => {
  let constantsKeys: string[];

  beforeEach(() => {
    constantsKeys = Object.keys(constants);
  });

  it("should export the correct keys", () => {
    expect(constantsKeys).toContain("SUB_SECTION_ORDERING_PRIOR_EMPLOYMENT");
  });

  it("should export the correct values", () => {
    expect(constants.SUB_SECTION_ORDERING_PRIOR_EMPLOYMENT).toBeDefined();
  });
});
