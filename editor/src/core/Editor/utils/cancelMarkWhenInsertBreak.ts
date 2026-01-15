import { Editor } from "slate"
// 回车取消mark
export const cancelMarkWhenInsertBreak = (editor: Editor, markKey: string) => {
    const { insertBreak } = editor
    editor.insertBreak = () => {
        const marks = Editor.marks(editor)
        if (marks?.bold) {
            Editor.removeMark(editor, markKey)
        }
        insertBreak()
    }
}