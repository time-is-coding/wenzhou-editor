// core/command/execute.ts
import type { Editor } from "slate";
import type { EditorCommand } from "../types";

/**
 * 执行命令并自动提交到历史栈
 * Operation 是在 editor.apply 中被拦截并自动记录的
 */
export function executeCommand(editor: Editor, command: EditorCommand, origin: "local" | "remote" = "local") {
  const history = (editor as any).historyManager;

  // 执行命令（其中的所有操作会被自动拦截）
  command.execute(editor);

  // 提交事务到历史栈
  // undo/redo 命令不需要再次提交
  const isHistoryCommand = command.key === "undo" || command.key === "redo";

  if (history && !isHistoryCommand) {
    history.commit(editor, command.key, origin);
  }
}
