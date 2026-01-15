// core/createEditor.ts
import { createEditor as createSlateEditor } from "slate";
import { withReact } from "slate-react";
import type { SlatePlugin } from "./types";

export const createEditor = (plugins: SlatePlugin[]) => {
  let editor = withReact(createSlateEditor());

  // 保存原始 normalizeNode
  const { normalizeNode } = editor;

  // 重新覆盖 editor.normalizeNode
  editor.normalizeNode = (entry) => {
    // 遍历每个插件的 normalizeNode
    plugins.forEach((plugin) => {
      plugin.normalizeNode?.(entry, editor);
    });

    // 最后调用默认的 normalizeNode 保证 Slate 树正常
    normalizeNode(entry);
  };

  // withEditor 是一个“编辑器能力增强函数”
  // Slate 的 editor 本质是一个「可变对象 + 方法集合」
  // 它是一个 可以被装饰（decorate）的对象
  // 可拦截 可替换 可组合 顺序明确
  // 还可以拓展权重相关内容
  plugins.forEach((plugin) => {
    if (plugin.withEditor) {
      editor = plugin.withEditor(editor);
    }
  });

  return editor;
};
