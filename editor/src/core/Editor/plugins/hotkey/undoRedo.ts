import { executeCommand } from "../../command/execute";
import { redoCommand } from "../../command/redo";
import { undoCommand } from "../../command/undo";
import type { SlatePlugin } from "../../types";

// core/plugins/hotkey/undoRedo.ts
export const UndoRedoPlugin: SlatePlugin = {
  key: "undo-redo",

  hotkeys: [
    { hotkey: "mod+z", handler: (editor) => executeCommand(editor, undoCommand) },
    { hotkey: "mod+y", handler: (editor) => executeCommand(editor, redoCommand) },
  ],
};
