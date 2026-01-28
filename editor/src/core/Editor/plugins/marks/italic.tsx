
import type { SlatePlugin } from "../../types"
import { cancelMarkWhenInsertBreak } from "../../utils";
import { createToggleMarkCommand } from "../../command";
import { executeCommand } from "../../command";

export const ITALIC_KEY = "italic";
const ITALIC_HOTKEY = 'mod+i'

export const ItalicPlugin: SlatePlugin = {
  key: ITALIC_KEY,
  renderLeaf: ({ leaf, attributes, children }) => {
    if (leaf[ITALIC_KEY]) {
      children = <em {...attributes}>{children}</em>;
    }
    return children;
  },
  // onKeyDown（事件层）
  hotkeys: [
    {
      hotkey: ITALIC_HOTKEY,
      handler: (editor) => executeCommand(editor, createToggleMarkCommand(ITALIC_KEY)),
    },
  ],

  // withEditor（行为层）
  withEditor: (editor) => {
    cancelMarkWhenInsertBreak(editor, ITALIC_KEY)
    return editor
  },
}
