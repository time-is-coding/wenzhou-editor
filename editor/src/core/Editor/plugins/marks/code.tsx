import type { SlatePlugin } from "../../types"
import { cancelMarkWhenInsertBreak } from "../../utils";
import { createToggleMarkCommand } from "../../command";
import { executeCommand } from "../../command";

export const CODE_KEY = "code";
export const CODE_HOTKEY = "mod+k";

export const CodePlugin: SlatePlugin = {
  key: CODE_KEY,
  renderLeaf: ({ leaf, attributes, children }) => {
    if (leaf[CODE_KEY]) {
      children = <code>{children}</code>
    }
    return children;
  },
  // onKeyDown（事件层）
  hotkeys: [
    {
      hotkey: CODE_HOTKEY,
      handler: (editor) => executeCommand(editor, createToggleMarkCommand(CODE_KEY)),
    },
  ],

  // withEditor（行为层）
  withEditor: (editor) => {
    cancelMarkWhenInsertBreak(editor, CODE_KEY)
    return editor
  },
}
