// core/render/renderLeaf.tsx
import type { ReactElement } from 'react'
import type { SlatePlugin } from '../types'
import type { RenderLeafProps } from 'slate-react'

export const createRenderLeaf =
    (plugins: SlatePlugin[]) =>
        (props: RenderLeafProps): ReactElement => {
            let el = props.children;
            for (const plugin of plugins) {
                if (plugin.renderLeaf) {
                    el = plugin.renderLeaf({ ...props, children: el }) || el;
                }
            }
            return <span {...props.attributes}>{el}</span>
        }
