/**
 * 实现 Markdown 行内代码语法 `代码` 的处理规则
 * 当用户输入 `代码` 并按空格后，将其转换为富文本格式的行内代码效果
 */
import { Editor, Range, Text, Point } from "slate";
import type { LeafMarkdownRuleMatch, MarkdownRule } from "./types";
import { isBlockElement } from "../../utils";
import { CODE_KEY } from "../marks/code";
import { applyInleCodeFromMarkdown } from "../../command";

export const markdownInlineCodeRule: MarkdownRule<LeafMarkdownRuleMatch> = {
  key: CODE_KEY,

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

    const match = text.match(/`([^`]+)`$/);
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
      text: match[1],
      range: { anchor: start, focus: cursor },
    };
  },

  apply(editor, match) {
    applyInleCodeFromMarkdown(editor, match);
  },
};
