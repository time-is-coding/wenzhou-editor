import { Text, Transforms } from "slate";
import type { NormalizeRule } from "./types";

export const removeFalseMark = (key: string): NormalizeRule => {
  return (entry, editor) => {
    const [node, path] = entry;

    if (!Text.isText(node)) return;

    if ((node as any)[key] === false) {
      Transforms.unsetNodes(editor, key, { at: path });
      return true; // ⭐ 已处理，终止 normalize
    }
  };
};
