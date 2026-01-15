import { Editor } from "slate";
import type { SlatePlugin } from "../../types"
import { cancelMarkWhenInsertBreak, toggleMark } from "../../utils";
export const ITALIC_KEY = "italic";
const ITALIC_HOTKEY = 'mod+i'
// core/plugins/marks/italic.ts
export const ItalicPlugin: SlatePlugin = {
  key: ITALIC_KEY,
  renderLeaf: ({ leaf, attributes, children }) => {
    if (leaf.italic) {
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
