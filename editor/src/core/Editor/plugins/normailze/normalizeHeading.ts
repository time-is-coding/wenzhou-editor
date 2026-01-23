import type { NormalizeRule } from "./types";
import { Element, Transforms } from "slate";

export const normalizeHeading: NormalizeRule = (entry, editor) => {
  const [node, path] = entry;
  if (Element.isElement(node) && node.type === "heading") {
    if (typeof node.level !== "number" || node.level < 1 || node.level > 6) {
      Transforms.setNodes(editor, { type: "paragraph" }, { at: path });
      return true;
    }
  }
};
