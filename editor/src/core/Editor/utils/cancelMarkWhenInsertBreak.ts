import { Editor } from "slate";
// 回车取消mark
export const cancelMarkWhenInsertBreak = (editor: Editor, markKey: string) => {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const marks = Editor.marks(editor);
    if (marks && (marks as any)[markKey]) {
      Editor.removeMark(editor, markKey);
    }
    insertBreak();
  };
};
