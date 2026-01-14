import React from "react";
import type { SlatePlugin } from "./base";
import { Transforms, Editor, Element } from "slate";

interface TodoListPluginData {
  checked?: boolean;
}

/**
 * 待办事项元素渲染组件
 */
const TodoItemElement = ({ attributes, children, element }: any) => {
  const checked = element.checked || false;
  
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 通过点击复选框切换状态
    const child = React.Children.toArray(children)[0];
    if (React.isValidElement<{ node?: { path: any } }>(child) && child.props.node) {
      const path = child.props.node.path;
      if(path) {
        Transforms.setNodes(
          Editor as any, 
          { checked: e.target.checked }, 
          { at: path }
        );
      }
    }
  };

  return (
    <li {...attributes}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        style={{ marginRight: '8px' }}
      />
      <span style={{ textDecoration: checked ? 'line-through' : 'none' }}>
        {children}
      </span>
    </li>
  );
};

/**
 * 待办事项插件，处理待办事项的渲染、命令和快捷键
 */
export const todoListPlugin: SlatePlugin<TodoListPluginData> = {
  key: "todoList",
  priority: 35,
  renderElement: (props) => {
    const { element } = props;
    if (Element.isElement(element) && element.type === "todo-item") {
      return <TodoItemElement {...props} />;
    }
    return null;
  },
  command: (editor, data) => {
    Transforms.setNodes(editor, {
      type: "todo-item",
      checked: data?.checked || false,
    });
  },
  onKeyDown: (event, editor) => {
    // 阻止在代码块内触发待办事项转换
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code-block"
    });
    
    if (match) return false;

    if (event.key === " " && event.target instanceof HTMLElement) {
      const path = editor.selection?.anchor.path;
      if (!path) return false;
      
      const text = Editor.string(editor, path);
      
      // 检查是否是以 "[ ] " 或 "[x] " 开头的待办事项
      if (text.startsWith("[ ] ")) {
        event.preventDefault();
        
        // 删除 "[ ] " 并转换为待办事项
        const start = Editor.start(editor, path);
        Transforms.delete(editor, {
          at: {
            anchor: start,
            focus: {
              ...start,
              offset: 4, // 删除 "[ ] "
            },
          },
        });
        
        Transforms.setNodes(editor, { 
          type: "todo-item",
          checked: false
        });
        
        return true;
      } else if (text.startsWith("[x] ")) {
        event.preventDefault();
        
        // 删除 "[x] " 并转换为待办事项
        const start = Editor.start(editor, path);
        Transforms.delete(editor, {
          at: {
            anchor: start,
            focus: {
              ...start,
              offset: 4, // 删除 "[x] "
            },
          },
        });
        
        Transforms.setNodes(editor, { 
          type: "todo-item", 
          checked: true
        });
        
        return true;
      }
    }
    return false;
  },
};