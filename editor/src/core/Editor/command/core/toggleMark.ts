import { Editor } from "slate";
import type { EditorCommand } from "../types";

// 1. 工具函数
export const toggleMark = (editor: Editor, markKey: string) => {
  Editor.withoutNormalizing(editor, () => {
    const marks = Editor.marks(editor);
    const isActive = marks ? (marks as any)[markKey] : false;
    if (isActive) {
      Editor.removeMark(editor, markKey);
    } else {
      Editor.addMark(editor, markKey, true);
    }
  });
};

// 2. 创建 EditorCommand
export const createToggleMarkCommand = (markKey: string): EditorCommand => ({
  key: `toggle-mark-${markKey}`,
  execute(editor: Editor) {
    toggleMark(editor, markKey);
  },
});
