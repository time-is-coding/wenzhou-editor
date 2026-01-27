// core/history/HistoryManager.ts
import type { Editor } from "slate";
import type { Transaction } from "./types";

export class HistoryManager {
  private undoStack: Transaction[] = [];
  private redoStack: Transaction[] = [];

  push(tx: Transaction) {
    if (tx.origin === "local") {
      this.undoStack.push(tx);
      this.redoStack = [];
    }
  }

  undo(editor: Editor) {
    const tx = this.undoStack.pop();
    if (!tx) return;

    editor.undo(); // 暂时委托给 slate-history
    this.redoStack.push(tx);
    debugger;
  }

  redo(editor: Editor) {
    const tx = this.redoStack.pop();
    if (!tx) return;

    editor.redo();
    this.undoStack.push(tx);
    debugger;
  }
}
