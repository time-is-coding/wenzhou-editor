// core/render/renderLeaf.tsx
import type { ReactElement } from 'react'
import type { SlatePlugin } from '../types'
import type { RenderLeafProps } from 'slate-react'

export const createRenderLeaf =
    (plugins: SlatePlugin[]) =>
        (props: RenderLeafProps): ReactElement => {
            for (const plugin of plugins) {
                const render = plugin.renderLeaf
                if (!render) continue
                const element = render(props)
                if (element) return element
            }
            return <span {...props.attributes}>{props.children}</span>
        }
