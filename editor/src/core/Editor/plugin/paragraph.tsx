import type { SlatePlugin } from "./base";
import { PARAGRAPH } from "../config/const";
import { Editor, Transforms, Element } from "slate";

/**
 * 段落元素渲染组件
 */
const ParagraphElement = ({ attributes, children }: any) => {
  return <p {...attributes}>{children}</p>;
};

/**
 * 段落插件，处理普通文本段落的渲染和命令
 */
export const paragraphPlugin: SlatePlugin = {
  key: "paragraph",
  priority: 10,
  renderElement: (props) => {
    const { element } = props;
    if (element.type === PARAGRAPH || !element.type) {
      return <ParagraphElement {...props} />;
    }
    return null;
  },
  command: (editor) => {
    Transforms.setNodes(editor, {
      type: PARAGRAPH,
    });
  },
  onKeyDown: (event, editor) => {
    // 回车键处理
    if (event.key === "Enter") {
      // 在列表项中按回车时，如果是空行则退出列表
      const [listItemMatch] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "li"
      });

      if (listItemMatch) {
        const text = Editor.string(editor, editor.selection?.anchor.path!);
        if (text === "") {
          // 如果是空列表项，退出列表
          event.preventDefault();
          Transforms.setNodes(editor, { type: PARAGRAPH });
          return true;
        }
      }
    }
    return false;
  },
};