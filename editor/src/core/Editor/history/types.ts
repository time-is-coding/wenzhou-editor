import type { Operation } from "slate";

/**
 * Operation 型历史 (Plate 方案)
 * 存储一个命令级别的原子操作，包含多个 Slate Operations
 */
export interface Transaction {
  id: string;
  /** 命令标识 */
  commandKey: string;
  origin: "local" | "remote";
  /** Slate 的操作序列 */
  operations: Operation[];
  /** 时间戳 */
  timestamp: number;
}
