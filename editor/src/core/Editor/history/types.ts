// 事务，undo/redo操作的是一次事务（一次用户意图，而不是slate的apply）
// core/history/types.ts
export interface Transaction {
  id: string;
  commandKey: string;
  origin: "local" | "remote";
}
