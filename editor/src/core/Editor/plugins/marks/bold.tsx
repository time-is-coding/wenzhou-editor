// core/plugins/marks/bold.ts
import type { SlatePlugin } from "../../types";
import { cancelMarkWhenInsertBreak } from "../../utils";
import { createToggleMarkCommand } from "../../command";
import { executeCommand } from "../../command";

export const BOLD_KEY = "bold";
const BOLD_HOTKEY = 'mod+b'

export const BoldPlugin: SlatePlugin = {
  key: BOLD_KEY,

  // 视图层
  renderLeaf: ({ leaf, attributes, children }) => {
    if (leaf[BOLD_KEY]) {
      children = <strong>{children}</strong>;
    }
    return children;
  },

  // onKeyDown（事件层）
  hotkeys: [
    {
      hotkey: BOLD_HOTKEY,
      handler: (editor) => executeCommand(editor, createToggleMarkCommand(BOLD_KEY)),
    },
  ],

  // withEditor（行为层）
  withEditor: (editor) => {
    cancelMarkWhenInsertBreak(editor, BOLD_KEY)
    return editor
  },
};
