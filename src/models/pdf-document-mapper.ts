export class PdfDocumentMapper {
  private _rawFileName: string;
  private _documentPath: string;

  constructor(options: { rawFileName: string; documentPath: string }) {
    this._rawFileName = options.rawFileName;
    this._documentPath = options.documentPath;
  }

  public get fileNameKey(): string {
    return this._rawFileName;
  }

  public get fileName(): string {
    return `${this._rawFileName}.pdf`;
  }

  public get documentPath(): string {
    return `${this._documentPath}/${this.fileName}`;
  }
}
