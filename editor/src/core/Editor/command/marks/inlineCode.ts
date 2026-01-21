import { Editor, Text, Transforms, Point, Range } from "slate";
import { CODE_KEY } from "../../plugins/marks/code";

export interface ApplyInleCodeFromMarkdownOptions {
  range: Range;
  text: string;
}
export function applyInleCodeFromMarkdown(editor: Editor, options: ApplyInleCodeFromMarkdownOptions) {
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
      { code: true },
      { at: { anchor: startPoint, focus: endPoint }, match: Text.isText, split: true },
    );

    Transforms.select(editor, endPoint);

    Editor.removeMark(editor, CODE_KEY);
  });
}
