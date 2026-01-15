import { Editor, type NodeEntry } from "slate";

export type NormalizeRule = (entry: NodeEntry, editor: Editor) => boolean | void;
