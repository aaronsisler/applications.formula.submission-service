import { timeElapsedLogger } from "./index";

describe("utils/Time Elapsed Logger", () => {
  const mockStartTime = 1;
  const mockMessage = "mock-message";
  let consoleInfoSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleInfoSpy = jest
      .spyOn(console, "info")
      .mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    consoleInfoSpy.mockRestore();
  });

  it("should be a function", () => {
    expect(typeof timeElapsedLogger).toEqual("function");
  });

  it("should log message correctly", () => {
    timeElapsedLogger(mockStartTime, mockMessage);

    expect(console.info).toBeCalled();
  });
});
