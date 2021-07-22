import { PdfGenerationService } from "./index";

describe("services/PdfGenerationService", () => {
  let pdfGenerationService: PdfGenerationService;

  beforeEach(() => {
    pdfGenerationService = new PdfGenerationService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be a class", () => {
    expect(typeof PdfGenerationService).toEqual("function");
    expect(typeof pdfGenerationService).toEqual("object");
  });
});
