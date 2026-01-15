// core/createEditor.ts
import { createEditor as createSlateEditor } from "slate";
import { withReact } from "slate-react";
import type { SlatePlugin } from "./types";

export const createEditor = (plugins: SlatePlugin[]) => {
  let editor = withReact(createSlateEditor());

  plugins.forEach((plugin) => {
    if (plugin.withEditor) {
      editor = plugin.withEditor(editor);
    }
  });

  return editor;
};
