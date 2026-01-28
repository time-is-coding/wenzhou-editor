// core/command/undo.ts
import type { Editor } from "slate";
import type { EditorCommand } from "../types";

export const undoCommand: EditorCommand = {
  key: "undo",
  execute(editor: Editor) {
    (editor as any).historyManager.undo(editor);
  },
};
