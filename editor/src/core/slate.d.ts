import "slate";
import type { BaseEditor, BaseElement, BaseText } from "slate";
import type { ReactEditor } from "slate-react";
import type { HistoryEditor } from "slate-history";
import { HeadingElement, ParagraphElement } from "./Editor/schema";

// 获取 CustomText 的所有键的联合类型
export type CustomTextKeys = keyof CustomText;
declare module "slate" {
  interface CustomText {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    strikethrough?: boolean;
    text: string;
  }
}

export type CustomElement = ParagraphElement | HeadingElement;

/**
 * Slate 类型注入（关键）
 */
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
