import { DatabaseService } from "./index";

describe("services/DatabaseService", () => {
  let databaseService: DatabaseService;

  beforeEach(() => {
    databaseService = new DatabaseService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof DatabaseService).toEqual("function");
    expect(typeof databaseService).toEqual("object");
  });
});
