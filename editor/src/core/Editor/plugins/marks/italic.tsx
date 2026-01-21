
import type { SlatePlugin } from "../../types"
import { cancelMarkWhenInsertBreak } from "../../utils";
import { toggleMark } from "../../command";

export const ITALIC_KEY = "italic";
const ITALIC_HOTKEY = 'mod+i'

export const ItalicPlugin: SlatePlugin = {
  key: ITALIC_KEY,
  renderLeaf: ({ leaf, attributes, children }) => {
    if (leaf[ITALIC_KEY]) {
      children = <em>{children}</em>;
    }
    return children;
  },
  // onKeyDown（事件层）
  hotkeys: [
    {
      hotkey: ITALIC_HOTKEY,
      handler: (editor) => toggleMark(editor, ITALIC_KEY),
    },
  ],

  // withEditor（行为层）
  withEditor: (editor) => {
    cancelMarkWhenInsertBreak(editor, ITALIC_KEY)
    return editor
  },
}
