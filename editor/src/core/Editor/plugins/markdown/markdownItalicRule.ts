/**
 * 实现 Markdown 加粗语法 **文本** 的处理规则
 * 当用户输入 **加粗文字** 并按空格后，将其转换为富文本格式的加粗效果
 */
import { Editor, Range, Text, Transforms, Point } from "slate";
import type { MarkdownRule } from "./types";
import { isBlockElement } from "../../utils";
import { ITALIC_KEY } from "../marks/italic";
import { applyItalicFromMarkdown } from "../../command";

export const markdownItalicRule: MarkdownRule = {
  key: ITALIC_KEY,

  trigger: " ",

  match(editor) {
    const { selection } = editor;
    if (!selection || !Range.isCollapsed(selection)) return null;

    const cursor = selection.anchor;
    const block = Editor.above(editor, {
      match: isBlockElement(editor),
    });
    if (!block) return null;

    const blockStart = Editor.start(editor, block[1]);
    const text = Editor.string(editor, {
      anchor: blockStart,
      focus: cursor,
    });

    // 匹配被 _ 或 * 包裹的文本
    const match = text.match(/([*_])([^*_]+)\1$/);
    if (!match) return null;
    const [textNode, textPath] = Editor.node(editor, cursor);
    if (!Text.isText(textNode)) return null;
    const startOffset = cursor.offset - match[0].length;
    if (startOffset < 0) return null;
    const start: Point = {
      path: textPath,
      offset: startOffset,
    };
    return {
      text: match[2],
      range: { anchor: start, focus: cursor },
    };
  },

  apply(editor, match) {
    applyItalicFromMarkdown(editor, match);
  },
};
