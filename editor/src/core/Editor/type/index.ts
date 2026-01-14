import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";
import type { HistoryEditor } from "slate-history";

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  [key: string]: any;
};

export type BaseCustomElement = {
  type: string;
  children: Array<CustomElement | CustomText>;
  [key: string]: any;
};

export type ParagraphElement = BaseCustomElement & {
  type: 'paragraph';
};

export type HeadingElement = BaseCustomElement & {
  type: 'heading';
  level: number;
};

export type ListElement = BaseCustomElement & {
  type: 'ul' | 'ol';
};

export type ListItemElement = BaseCustomElement & {
  type: 'li';
  checked?: boolean;
};

export type CodeBlockElement = BaseCustomElement & {
  type: 'code-block';
  language?: string;
};

export type BlockQuoteElement = BaseCustomElement & {
  type: 'block-quote';
};

export type TodoItemElement = BaseCustomElement & {
  type: 'todo-item';
  checked?: boolean;
};

export type CustomElement = 
  | ParagraphElement 
  | HeadingElement 
  | ListElement 
  | ListItemElement
  | CodeBlockElement
  | BlockQuoteElement
  | TodoItemElement;

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}