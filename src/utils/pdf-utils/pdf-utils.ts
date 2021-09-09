import { PdfStyles } from "../../models/pdf-styles";

export const padRight = (input: string, length: number): string => {
  const paddedRight =
    input + PdfStyles.SPACE_SINGLE.repeat(length - input.length);

  return paddedRight;
};
