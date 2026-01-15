import type { SlatePlugin } from "../../types"
export const CODE_KEY = "code";
// core/plugins/marks/code.ts
export const CodePlugin: SlatePlugin = {
  key: CODE_KEY,
  renderLeaf: ({ leaf, attributes, children }) => {
    if (!leaf.code) return null;
    return (
      <span {...attributes}>
        <code>{children}</code>
      </span>
    )
  },
}
