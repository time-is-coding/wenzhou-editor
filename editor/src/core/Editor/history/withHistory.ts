// core/history/withHistory.ts
import type { Editor, Operation } from "slate";
import { HistoryManager } from "./HistoryManager";

export function withEditorHistory(editor: Editor) {
  const historyManager = new HistoryManager();
  (editor as any).historyManager = historyManager;

  // 拦截编辑器的所有操作，记录到历史
  const { apply } = editor;

  editor.apply = (operation: Operation) => {
    // 先调用原始的 apply
    apply(operation);
    // 然后记录操作
    historyManager.recordOperation(operation);
  };

  return editor;
}
