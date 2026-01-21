import type { CustomText } from "slate";

export interface ParagraphElement {
  type: "paragraph";
  children: CustomText[];
}
