import { Editor } from "slate";

// 1. 工具函数
export const toggleMark = (editor: Editor, markKey: string) => {
  const marks = Editor.marks(editor);
  const isActive = marks ? (marks as any)[markKey] : false;
  if (isActive) {
    Editor.removeMark(editor, markKey);
  } else {
    Editor.addMark(editor, markKey, true);
  }
};
