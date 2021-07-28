import { ApplicantUploadService } from "./index";

describe("services/ApplicantUploadService", () => {
  let applicantUploadService: ApplicantUploadService;

  beforeEach(() => {
    applicantUploadService = new ApplicantUploadService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof ApplicantUploadService).toEqual("function");
    expect(typeof applicantUploadService).toEqual("object");
  });
});
