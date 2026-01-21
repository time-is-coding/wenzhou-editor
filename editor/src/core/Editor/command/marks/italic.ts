import { Editor, Text, Transforms, Point, Range } from "slate";
import { ITALIC_KEY } from "../../plugins/marks/italic";

export interface ApplyItalicFromMarkdownOptions {
  range: Range;
  text: string;
}
export function applyItalicFromMarkdown(editor: Editor, options: ApplyItalicFromMarkdownOptions) {
  const { range, text } = options;

  Editor.withoutNormalizing(editor, () => {
    const { anchor, focus } = range;
    const start = anchor.offset;
    const end = focus.offset;

    Transforms.delete(editor, {
      at: {
        anchor: { path: range.anchor.path, offset: end - 1 },
        focus: { path: range.anchor.path, offset: end },
      },
    });

    Transforms.delete(editor, {
      at: {
        anchor: { path: range.anchor.path, offset: start },
        focus: { path: range.anchor.path, offset: start + 1 },
      },
    });

    const startPoint = anchor;
    const endPoint: Point = { path: anchor.path, offset: start + text.length };
    Transforms.setNodes(
      editor,
      { italic: true },
      { at: { anchor: startPoint, focus: endPoint }, match: Text.isText, split: true },
    );

    Transforms.select(editor, endPoint);

    Editor.removeMark(editor, ITALIC_KEY);
  });
}
