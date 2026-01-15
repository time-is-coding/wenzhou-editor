import type { SlatePlugin } from "../../types"

// core/plugins/marks/code.ts
export const CodePlugin: SlatePlugin = {
  key: 'code',
  renderLeaf: ({ leaf, attributes, children }) => {
    if (!leaf.code) return null;
    return (
      <span {...attributes}>
        <code>{children}</code>
      </span>
    )
  },
}
