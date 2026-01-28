// core/history/HistoryManager.ts
import type { Editor, Operation } from "slate";
import type { Transaction } from "./types";
import { nanoid } from "nanoid";

/**
 * Operation-based HistoryManager (Plate 方案)
 * 基于 Slate Operations 的 undo/redo 实现
 * 内存高效，支持操作级别的精确回退
 */
export class HistoryManager {
  private undoStack: Transaction[] = [];
  private redoStack: Transaction[] = [];
  /** 当前积累的操作序列，等待提交 */
  private pendingOperations: Operation[] = [];
  /** 当前栈的最大深度 */
  private maxHistorySize = 100;
  /** 防止 undo/redo 时重复记录操作 */
  private isApplyingHistory = false;

  constructor(maxSize: number = 100) {
    this.maxHistorySize = maxSize;
  }

  /**
   * 记录一个操作到待提交队列
   */
  recordOperation(operation: Operation) {
    if (this.isApplyingHistory) return;
    this.pendingOperations.push(operation);
  }

  /**
   * 提交一个事务（命令级别）
   */
  commit(_editor: Editor, commandKey: string, origin: "local" | "remote" = "local") {
    if (this.pendingOperations.length === 0) return;

    if (origin === "local") {
      this.undoStack.push({
        id: nanoid(),
        commandKey,
        origin,
        operations: this.pendingOperations,
        timestamp: Date.now(),
      });

      // 清空 redo 栈
      this.redoStack = [];

      // 限制栈大小
      if (this.undoStack.length > this.maxHistorySize) {
        this.undoStack.shift();
      }
    }

    this.pendingOperations = [];
  }

  /**
   * 撤销操作
   */
  undo(editor: Editor) {
    const tx = this.undoStack.pop();
    if (!tx) return;

    this.isApplyingHistory = true;
    try {
      // 逆向应用操作序列
      for (let i = tx.operations.length - 1; i >= 0; i--) {
        const operation = tx.operations[i];
        const inverseOp = this.invertOperation(operation);
        // 直接通过 editor.apply 应用反向操作
        editor.apply(inverseOp);
      }
    } finally {
      this.isApplyingHistory = false;
    }

    this.redoStack.push(tx);
  }

  /**
   * 重做操作
   */
  redo(editor: Editor) {
    const tx = this.redoStack.pop();
    if (!tx) return;

    this.isApplyingHistory = true;
    try {
      // 正向应用操作序列
      for (const operation of tx.operations) {
        editor.apply(operation);
      }
    } finally {
      this.isApplyingHistory = false;
    }

    this.undoStack.push(tx);
  }

  /**
   * 反演操作 - 生成相反的操作
   * 这是 Plate 的核心：通过反演 operations 实现 undo
   */
  private invertOperation(operation: Operation): Operation {
    // Slate 的 Operation 类型处理
    const op = operation as any;

    switch (op.type) {
      case "insert_text":
        return {
          type: "remove_text",
          path: op.path,
          offset: op.offset,
          text: op.text,
        } as unknown as Operation;

      case "remove_text":
        return {
          type: "insert_text",
          path: op.path,
          offset: op.offset,
          text: op.text,
        } as unknown as Operation;

      case "insert_node":
        return {
          type: "remove_node",
          path: op.path,
          node: op.node,
        } as unknown as Operation;

      case "remove_node":
        return {
          type: "insert_node",
          path: op.path,
          node: op.node,
        } as unknown as Operation;

      case "set_node":
        // 交换 properties 和 newProperties
        return {
          type: "set_node",
          path: op.path,
          properties: op.newProperties,
          newProperties: op.properties,
        } as unknown as Operation;

      case "split_node":
        // split_node 的逆操作是 merge_node
        // 但需要小心处理参数
        return {
          type: "merge_node",
          path: op.path,
          position: op.position,
          target: op.target,
        } as unknown as Operation;

      case "merge_node":
        // merge_node 的逆操作是 split_node
        return {
          type: "split_node",
          path: op.path,
          position: op.position,
          target: op.target,
        } as unknown as Operation;

      case "move_node":
        return {
          type: "move_node",
          path: op.newPath,
          newPath: op.path,
        } as unknown as Operation;

      default:
        return operation;
    }
  }

  /**
   * 获取撤销栈大小
   */
  getUndoSize(): number {
    return this.undoStack.length;
  }

  /**
   * 获取重做栈大小
   */
  getRedoSize(): number {
    return this.redoStack.length;
  }

  /**
   * 清空所有历史
   */
  clear() {
    this.undoStack = [];
    this.redoStack = [];
    this.pendingOperations = [];
  }
}
