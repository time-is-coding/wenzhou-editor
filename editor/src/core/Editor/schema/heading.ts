import type { CustomText } from "slate";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingElement {
  type: "heading";
  level: HeadingLevel;
  children: CustomText[];
}
