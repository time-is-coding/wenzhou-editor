// core/render/renderElement.tsx
import type { SlatePlugin } from '../types'
import type { RenderElementProps } from 'slate-react'

export const createRenderElement =
  (plugins: SlatePlugin[]) =>
  (props: RenderElementProps) => {
    for (const plugin of plugins) {
      if (plugin.renderElement) {
        const element = plugin.renderElement(props)
        if (element) return element
      }
    }

    return <p {...props.attributes}>{props.children}</p>
  }