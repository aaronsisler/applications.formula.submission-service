import { databaseKeyParser } from "./index";

describe("utils/Database Key Parser", () => {
  let databaseKey: string;

  beforeEach(() => {
    databaseKey = "mock-prefix#mock-suffix";
  });

  afterEach(() => {});

  it("should be a function", () => {
    expect(typeof databaseKeyParser).toEqual("function");
  });

  it("should parse the database key correctly", () => {
    const result = databaseKeyParser(databaseKey);

    expect(result).toEqual("mock-suffix");
  });
});
