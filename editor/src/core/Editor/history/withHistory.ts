// core/history/withHistory.ts
import { withHistory } from "slate-history";
import type { Editor } from "slate";
import { HistoryManager } from "./HistoryManager";

export function withEditorHistory(editor: Editor) {
  const e = withHistory(editor);
  (e as any).historyManager = new HistoryManager();
  return e;
}
