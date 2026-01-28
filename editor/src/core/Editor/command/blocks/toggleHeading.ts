import { Editor, Transforms, Element } from "slate";
import type { EditorCommand } from "../types";
import type { HeadingLevel } from "../../schema";

export function toggleHeading(editor: Editor, level: HeadingLevel) {
  const isActive = isHeadingActive(editor, level);

  Editor.withoutNormalizing(editor, () => {
    Transforms.setNodes(editor, isActive ? { type: "paragraph" } : { type: "heading", level }, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
    });
  });
}

export function isHeadingActive(editor: Editor, level: number): boolean {
  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === "heading" && n.level === level,
  });

  return !!match;
}

// 创建 EditorCommand
export const createToggleHeadingCommand = (level: HeadingLevel): EditorCommand => ({
  key: `toggle-heading-${level}`,
  execute(editor: Editor) {
    toggleHeading(editor, level);
  },
});
