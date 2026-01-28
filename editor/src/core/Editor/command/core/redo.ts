// core/command/redo.ts
import type { EditorCommand } from "../types";

export const redoCommand: EditorCommand = {
  key: "redo",
  execute(editor) {
    (editor as any).historyManager.redo(editor);
  },
};
