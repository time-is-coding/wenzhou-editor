import type { SlatePlugin } from "./base";
import { Transforms, Editor, Element, Text } from "slate";

interface FormatPluginData {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

/**
 * 文本格式渲染组件
 * 正确处理多种格式属性同时存在的情况
 */
const FormatLeaf = ({ attributes, children, leaf }: any) => {
  // 从叶子节点提取格式属性
  const { bold, italic, underline, strikethrough, code, ...rest } = leaf;

  // 按照嵌套顺序应用格式
  let content = <span {...attributes}>{children}</span>;

  if (bold) {
    content = <strong>{content}</strong>;
  }
  if (italic) {
    content = <em>{content}</em>;
  }
  if (underline) {
    content = <u>{content}</u>;
  }
  if (strikethrough) {
    content = <s>{content}</s>;
  }
  if (code) {
    content = <code {...rest}>{content}</code>;
  }

  return content;
};

/**
 * 文本格式插件，处理文本格式的渲染、命令和快捷键
 */
export const formatPlugin: SlatePlugin<FormatPluginData> = {
  key: "format",
  priority: 50,
  renderLeaf: (props) => {
    return <FormatLeaf {...props} />;
  },
  command: (editor, data) => {
    if (data?.bold !== undefined) {
      Transforms.setNodes(
        editor,
        { bold: data.bold },
        { match: (n) => Text.isText(n), split: true }
      );
    }

    if (data?.italic !== undefined) {
      Transforms.setNodes(
        editor,
        { italic: data.italic },
        { match: (n) => Text.isText(n), split: true }
      );
    }

    if (data?.underline !== undefined) {
      Transforms.setNodes(
        editor,
        { underline: data.underline },
        { match: (n) => Text.isText(n), split: true }
      );
    }

    if (data?.strikethrough !== undefined) {
      Transforms.setNodes(
        editor,
        { strikethrough: data.strikethrough },
        { match: (n) => Text.isText(n), split: true }
      );
    }
  },
  onKeyDown: (event, editor) => {
    // 阻止在代码块内触发格式化
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code-block"
    });
    
    if (match) return false;

    // 支持Markdown快捷键：**粗体*, *斜体*, ~~删除线~~
    if (
      (event.key === "*" || event.key === "_" || event.key === "~") &&
      event.target instanceof HTMLElement
    ) {
      const path = editor.selection?.anchor.path;
      if (!path) return false;
      
      const text = Editor.string(editor, path);
      
      if (event.key === "*" || event.key === "_") {
        // 处理粗体和斜体
        if (event.shiftKey && (event.key === "*" || event.key === "_")) {
          // **粗体**
          const doubleAsteriskMatch = text.match(/(\*\*|__)(.*?)\1$/);
          if (doubleAsteriskMatch) {
            event.preventDefault();
            Transforms.setNodes(
              editor,
              { bold: true },
              { match: (n) => Text.isText(n), split: true }
            );
            return true;
          }
        } else {
          // *斜体*
          const singleAsteriskMatch = text.match(/(\*|_)(.*?)\1$/);
          if (singleAsteriskMatch && !text.match(/(\*\*|__)/)) {
            event.preventDefault();
            Transforms.setNodes(
              editor,
              { italic: true },
              { match: (n) => Text.isText(n), split: true }
            );
            return true;
          }
        }
      } else if (event.key === "~") {
        // ~~删除线~~
        const strikethroughMatch = text.match(/(~~)(.*?)\1$/);
        if (strikethroughMatch) {
          event.preventDefault();
          Transforms.setNodes(
            editor,
            { strikethrough: true },
            { match: (n) => Text.isText(n), split: true }
          );
          return true;
        }
      }
    }
    return false;
  },
};