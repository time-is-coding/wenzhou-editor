import type { SlatePlugin } from "../../types"

// core/plugins/marks/italic.ts
export const ItalicPlugin: SlatePlugin = {
  key: 'italic',
  renderLeaf: ({ leaf, attributes, children }) => {
    if (!leaf.italic) return null;
    return (
      <span {...attributes}>
        <em>{children}</em>
      </span>
    )
  },
}
