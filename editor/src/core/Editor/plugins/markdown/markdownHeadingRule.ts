import { applyHeadingFromMarkdown } from "../../command";
import type { HeadingLevel } from "../../schema";
import type { MarkdownRule } from "./types";
import { Range, Editor, Element, Path } from "slate";

export interface MarkdownHeadingMatch {
  path: Path;
  level: HeadingLevel;
}

export const markdownHeadingRule: MarkdownRule<MarkdownHeadingMatch> = {
  key: "heading",
  trigger: " ",

  match(editor) {
    const { selection } = editor;
    if (!selection || !Range.isCollapsed(selection)) return null;

    const block = Editor.above(editor, {
      match: (n) => Element.isElement(n) && n.type === "paragraph",
    });
    if (!block) return null;

    const [, path] = block;
    const text = Editor.string(editor, path);

    const match = text.match(/^(#{1,6})$/);
    if (!match) return null;

    return {
      level: match[1].length as HeadingLevel,
      path,
    };
  },

  apply(editor, options) {
    applyHeadingFromMarkdown(editor, options);
  },
};
