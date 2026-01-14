import React from "react";
import type { SlatePlugin } from "./base";
import { Transforms, Editor, Element } from "slate";

interface ListPluginData {
  ordered?: boolean;
}

/**
 * 列表元素渲染组件
 */
const ListElement = ({ attributes, children, element }: any) => {
  const isOrdered = element.type === "ol";
  const Tag = isOrdered ? "ol" : "ul";
  return <Tag {...attributes}>{children}</Tag>;
};

/**
 * 列表项元素渲染组件
 */
const ListItemElement = ({ attributes, children }: any) => {
  return <li {...attributes}>{children}</li>;
};

/**
 * 列表插件，处理有序列表和无序列表的渲染、命令和快捷键
 */
export const listPlugin: SlatePlugin<ListPluginData> = {
  key: "list",
  priority: 30,
  renderElement: (props) => {
    const { element } = props;
    if (Element.isElement(element) && (element.type === "ul" || element.type === "ol")) {
      return <ListElement {...props} />;
    }
    if (Element.isElement(element) && element.type === "li") {
      return <ListItemElement {...props} />;
    }
    return null;
  },
  command: (editor, data) => {
    const type = data?.ordered ? "ol" : "ul";
    Transforms.wrapNodes(editor, {
      type,
      children: [],
    });
  },
  onKeyDown: (event, editor) => {
    // 阻止在代码块内触发列表转换
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code-block"
    });
    
    if (match) return false;

    if (event.key === " " && event.target instanceof HTMLElement) {
      const path = editor.selection?.anchor.path;
      if (!path) return false;
      
      const text = Editor.string(editor, path);
      
      // 检查是否是以 `- ` 或 `1. ` 开头的列表项
      if (text.startsWith("- ")) {
        event.preventDefault();
        
        // 删除 `- ` 并转换为无序列表
        const start = Editor.start(editor, path);
        Transforms.delete(editor, {
          at: {
            anchor: start,
            focus: {
              ...start,
              offset: 2, // 删除 "- "
            },
          },
        });
        
        Transforms.wrapNodes(
          editor,
          { type: "ul", children: [] },
          { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
        
        Transforms.setNodes(editor, { type: "li" });
        
        return true;
      } else if (/^\d+\.\s/.test(text)) {
        event.preventDefault();
        
        // 删除数字编号并转换为有序列表
        const match = text.match(/^(\d+)\.\s/);
        if (match) {
          const digits = match[0].length;
          
          const start = Editor.start(editor, path);
          Transforms.delete(editor, {
            at: {
              anchor: start,
              focus: {
                ...start,
                offset: digits,
              },
            },
          });
          
          Transforms.wrapNodes(
            editor,
            { type: "ol", children: [] },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
          );
          
          Transforms.setNodes(editor, { type: "li" });
          
          return true;
        }
      }
    }
    return false;
  },
};