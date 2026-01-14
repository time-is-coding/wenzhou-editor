import type { SlatePlugin } from "./base";
import { Transforms, Editor, Element } from "slate";

/**
 * 引用块元素渲染组件
 */
const BlockQuoteElement = ({ attributes, children }: any) => {
  return <blockquote {...attributes}>{children}</blockquote>;
};

/**
 * 引用块插件，处理引用块的渲染、命令和快捷键
 */
export const blockQuotePlugin: SlatePlugin = {
  key: "blockQuote",
  priority: 25,
  renderElement: (props) => {
    const { element } = props;
    if (Element.isElement(element) && element.type === "block-quote") {
      return <BlockQuoteElement {...props} />;
    }
    return null;
  },
  command: (editor) => {
    Transforms.setNodes(editor, {
      type: "block-quote",
    });
  },
  onKeyDown: (event, editor) => {
    // 阻止在代码块内触发引用转换
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code-block"
    });
    
    if (match) return false;
    
    // 支持Markdown快捷键：> 引用
    if (event.key === ">" && event.target instanceof HTMLElement) {
      const path = editor.selection?.anchor.path;
      if (!path) return false;
      
      const text = Editor.string(editor, path);
      const match = text.match(/^>\s/);
      
      if (match) {
        event.preventDefault();
        
        Transforms.setNodes(editor, {
          type: "block-quote",
        });
        
        // 删除开头的 > 和空格
        const start = Editor.start(editor, path);
        Transforms.delete(editor, {
          at: {
            anchor: start,
            focus: {
              ...start,
              offset: 2, // 删除 "> "
            },
          },
        });
        
        return true;
      }
    }
    return false;
  },
};