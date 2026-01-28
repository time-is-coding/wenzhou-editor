import { executeCommand } from "../../command";
import { redoCommand } from "../../command";
import { undoCommand } from "../../command";
import type { SlatePlugin } from "../../types";

// core/plugins/hotkey/undoRedo.ts
export const UndoRedoPlugin: SlatePlugin = {
  key: "undo-redo",

  hotkeys: [
    { hotkey: "mod+z", handler: (editor) => executeCommand(editor, undoCommand) },
    { hotkey: "mod+y", handler: (editor) => executeCommand(editor, redoCommand) },
  ],
};
