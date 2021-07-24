import { DocumentUploadService } from "./index";

describe("services/DocumentUploadService", () => {
  let documentUploadService: DocumentUploadService;

  beforeEach(() => {
    documentUploadService = new DocumentUploadService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof DocumentUploadService).toEqual("function");
    expect(typeof documentUploadService).toEqual("object");
  });
});
