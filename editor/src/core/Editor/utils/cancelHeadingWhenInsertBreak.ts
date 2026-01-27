import { Editor, Element as SlateElement, Transforms } from "slate";
import { HEADING_KEY } from "../plugins/block/headingPlugin";
import { PARAGRAPH_KEY } from "../plugins/block/paragraphPlugin";
// 回车取消heading，改为paragraph
export const cancelHeadingWhenInsertBreak = (editor: Editor) => {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const [node] = Editor.nodes(editor, {
      match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
    });

    if (node && (node[0] as any).type === HEADING_KEY) {
      insertBreak();
      // 新行设为paragraph
      Transforms.setNodes(
        editor,
        { type: PARAGRAPH_KEY },
        {
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        },
      );
    } else {
      insertBreak();
    }
  };
};
