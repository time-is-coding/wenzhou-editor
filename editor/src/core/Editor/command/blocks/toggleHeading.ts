import { Editor, Transforms, Element } from "slate";
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
