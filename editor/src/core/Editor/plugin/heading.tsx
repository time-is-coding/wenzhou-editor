import React from "react";
import type { SlatePlugin } from "./base";
import { Transforms, Editor, Element } from "slate";

interface HeadingPluginData {
  level?: number;
}

// 定义HeadingElement组件的props类型
interface HeadingElementProps {
  attributes: any;
  children: React.ReactNode;
  element: {
    type: string;
    level: number;
  };
}

/**
 * 标题元素渲染组件
 */
const HeadingElement = ({ attributes, children, element }: HeadingElementProps) => {
  const level = element.level || 1;
  switch(level) {
    case 1:
      return <h1 {...attributes}>{children}</h1>;
    case 2:
      return <h2 {...attributes}>{children}</h2>;
    case 3:
      return <h3 {...attributes}>{children}</h3>;
    case 4:
      return <h4 {...attributes}>{children}</h4>;
    case 5:
      return <h5 {...attributes}>{children}</h5>;
    case 6:
      return <h6 {...attributes}>{children}</h6>;
    default:
      return <h1 {...attributes}>{children}</h1>;
  }
};

/**
 * 标题插件，处理标题的渲染、命令和快捷键
 */
export const headingPlugin: SlatePlugin<HeadingPluginData> = {
  key: "heading",
  priority: 20,
  renderElement: (props) => {
    const { element } = props;
    if (Element.isElement(element) && element.type === "heading") {
      return <HeadingElement {...props as HeadingElementProps} />;
    }
    return null;
  },
  command: (editor, data) => {
    const level = data?.level || 1;
    Transforms.setNodes(editor, {
      type: "heading",
      level,
    });
  },
  onKeyDown: (event, editor) => {
    // 阻止在代码块内触发标题转换
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code-block"
    });
    
    if (match) return false;
    
    // 支持Markdown快捷键：# 标题
    if (event.key === "#" && event.target instanceof HTMLElement) {
      const path = editor.selection?.anchor.path;
      if (!path) return false;
      
      const text = Editor.string(editor, path);
      const match = text.match(/^#{1,6}\s/);
      
      if (match) {
        event.preventDefault();
        const level = match[0].trim().length; // 计算#的数量作为标题级别
        
        Transforms.setNodes(editor, {
          type: "heading",
          level,
        });
        
        // 删除开头的 # 符号和空格
        const start = Editor.start(editor, path);
        Transforms.delete(editor, {
          at: {
            anchor: start,
            focus: {
              ...start,
              offset: level + 1, // # 的数量 + 1个空格
            },
          },
        });
        
        return true;
      }
    }
    return false;
  },
};