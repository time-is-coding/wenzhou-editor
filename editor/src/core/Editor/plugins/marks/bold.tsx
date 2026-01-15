// core/plugins/marks/bold.ts
import { Editor } from "slate";
import type { SlatePlugin } from "../../types";
import { toggleMark } from "../../utils";

export const BOLD_KEY = "bold";
const BOLD_HOTKEY = 'mod+b'

export const BoldPlugin: SlatePlugin = {
  key: BOLD_KEY,

  // 视图层
  renderLeaf: ({ leaf, attributes, children }) => {
    if (!leaf.bold) return null;
    return (
      <span {...attributes}>
        <strong>{children}</strong>
      </span>
    );
  },

  // onKeyDown（事件层）
  hotkeys: [
    {
      hotkey: BOLD_HOTKEY,
      handler: (editor)=>toggleMark(editor, BOLD_KEY),
    },
  ],

  // withEditor（行为层）
  withEditor: (editor) => {
    const { insertBreak } = editor

    // 回车取消加粗
    editor.insertBreak = () => {
      const marks = Editor.marks(editor)
      if (marks?.bold) {
        Editor.removeMark(editor, BOLD_KEY)
      }
      insertBreak()
    }

    return editor
  },
};
