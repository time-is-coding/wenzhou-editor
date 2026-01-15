// core/plugins/marks/bold.ts
import type { SlatePlugin } from "../../types";

export const BoldPlugin: SlatePlugin = {
  key: "bold",

  renderLeaf: ({ leaf, attributes, children }) => {
    if (!leaf.bold) return null;

    return (
      <span {...attributes}>
        <strong>{children}</strong>
      </span>
    );
  },
};
