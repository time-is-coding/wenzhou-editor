import { Transforms, type Element } from "slate";
import type { NormalizeRule } from "./types";

// 保证编辑器至少有一个paragraph节点
export const ensureAtLeastOneParagraph: NormalizeRule = (entry, editor) => {
  const [node, path] = entry;

  if (path.length !== 0) return;
  if (editor.children.length > 0) return;

  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  } as Element);

  return true;
};
