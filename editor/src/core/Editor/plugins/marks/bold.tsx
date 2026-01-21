// core/plugins/marks/bold.ts
import type { SlatePlugin } from "../../types";
import { cancelMarkWhenInsertBreak } from "../../utils";
import { toggleMark } from "../../command";

export const BOLD_KEY = "bold";
const BOLD_HOTKEY = 'mod+b'

export const BoldPlugin: SlatePlugin = {
  key: BOLD_KEY,

  // 视图层
  renderLeaf: ({ leaf, attributes, children }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    return children;
  },

  // onKeyDown（事件层）
  hotkeys: [
    {
      hotkey: BOLD_HOTKEY,
      handler: (editor) => toggleMark(editor, BOLD_KEY),
    },
  ],

  // withEditor（行为层）
  withEditor: (editor) => {
    cancelMarkWhenInsertBreak(editor, BOLD_KEY)
    return editor
  },
};
