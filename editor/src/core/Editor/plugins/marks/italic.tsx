import type { SlatePlugin } from "../../types"
export const ITALIC_KEY = "italic";
// core/plugins/marks/italic.ts
export const ItalicPlugin: SlatePlugin = {
  key: ITALIC_KEY,
  renderLeaf: ({ leaf, attributes, children }) => {
    if (!leaf.italic) return null;
    return (
      <span {...attributes}>
        <em>{children}</em>
      </span>
    )
  },
}
