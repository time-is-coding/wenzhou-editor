import { Editor, Text, Transforms, Point, Range } from "slate";
import { BOLD_KEY } from "../../plugins/marks/bold";

export interface ApplyBoldFromMarkdownOptions {
  range: Range;
  text: string;
}
export function applyBoldFromMarkdown(editor: Editor, options: ApplyBoldFromMarkdownOptions) {
  const { range, text } = options;
  const { anchor, focus } = range;

  Editor.withoutNormalizing(editor, () => {
    const start = anchor.offset;
    const end = focus.offset;

    // 1. 删除结尾 **
    Transforms.delete(editor, {
      at: {
        anchor: { path: anchor.path, offset: end - 2 },
        focus: { path: anchor.path, offset: end },
      },
    });

    // 2. 删除开头 **
    Transforms.delete(editor, {
      at: {
        anchor: { path: anchor.path, offset: start },
        focus: { path: anchor.path, offset: start + 2 },
      },
    });

    // 3. 设置 bold
    const startPoint = anchor;
    const endPoint: Point = {
      path: anchor.path,
      offset: start + text.length,
    };

    Transforms.setNodes(
      editor,
      { bold: true },
      {
        at: { anchor: startPoint, focus: endPoint },
        match: Text.isText,
        split: true,
      },
    );

    // 4. 移动光标
    Transforms.select(editor, endPoint);

    // 5. 关闭 bold mark
    Editor.removeMark(editor, BOLD_KEY);
  });
}
