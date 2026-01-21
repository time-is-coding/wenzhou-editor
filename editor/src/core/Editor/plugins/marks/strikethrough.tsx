import type { SlatePlugin } from "../../types";
import { cancelMarkWhenInsertBreak } from "../../utils";
import { toggleMark } from "../../command";

export const STRIKETHROUGH_KEY = "strikethrough";
const STRIKETHROUGH_HOTKEY = "mod+u";

export const StrikethroughPlugin: SlatePlugin = {
  key: STRIKETHROUGH_KEY,
  renderLeaf: ({ leaf, attributes, children }) => {
    if (leaf.italic) {
      children = <u>{children}</u>;
    }
    return children;
  },
  // onKeyDown（事件层）
  hotkeys: [
    {
      hotkey: STRIKETHROUGH_HOTKEY,
      handler: (editor) => toggleMark(editor, STRIKETHROUGH_KEY),
    },
  ],

  // withEditor（行为层）
  withEditor: (editor) => {
    cancelMarkWhenInsertBreak(editor, STRIKETHROUGH_KEY);
    return editor;
  },
};
