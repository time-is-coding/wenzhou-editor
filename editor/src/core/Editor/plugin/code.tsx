import CodeBlockElement from "../ui/element/CodeBlockElement";
import CodeLeaf from "../ui/leaf/CodeLeaf";
import type { SlatePlugin } from "./base";
import { Transforms, Editor, Element, Text } from "slate";

interface CodePluginData {
  block?: boolean;
  language?: string;
}

/**
 * 代码插件，处理代码块和行内代码的渲染、命令和快捷键
 */
export const codePlugin: SlatePlugin<CodePluginData> = {
  key: "code",
  priority: 40,
  renderElement: (props) => {
    const { element } = props;
    if (Element.isElement(element) && element.type === "code-block") {
      return <CodeBlockElement {...props} />;
    }
    return null;
  },
  renderLeaf: (props) => {
    const { leaf } = props;
    if ("code" in leaf && leaf.code) {
      return <CodeLeaf {...props} />;
    }
    return null;
  },
  command: (editor, data) => {
    if (data?.block) {
      Transforms.setNodes(editor, {
        type: "code-block",
        language: data.language || "plaintext",
      });
    } else {
      Transforms.setNodes(
        editor,
        { code: true },
        {
          match: (n) => Text.isText(n),
          split: true,
        }
      );
    }
  },
  onKeyDown: (event, editor) => {
    // 检查是否在代码块内部
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code-block"
    });
    
    if (match) return false;
    
    // 支持Markdown快捷键：``` 代码块, ` 行内代码
    if (event.key === "`" && !event.shiftKey && event.target instanceof HTMLElement) {
      const path = editor.selection?.anchor.path;
      if (!path) return false;
      
      const text = Editor.string(editor, path);
      const charCount = (text.match(/`/g) || []).length;

      if (charCount >= 2 && text.endsWith('``')) {
        // 代码块
        event.preventDefault();
        Transforms.setNodes(editor, {
          type: "code-block",
          language: "plaintext",
        });
        return true;
      } else if (charCount >= 1 && text.endsWith('`')) {
        // 行内代码
        event.preventDefault();
        Transforms.setNodes(
          editor,
          { code: true },
          { match: (n) => Text.isText(n), split: true }
        );
        return true;
      }
    }
    return false;
  },
};