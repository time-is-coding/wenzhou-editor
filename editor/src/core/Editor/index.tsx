// core/index.tsx
import { Slate, Editable } from 'slate-react'
import { useMemo } from 'react'
import { createEditor } from './createEditor'
import { corePlugins } from './plugins'
import { createRenderLeaf } from './render/renderLeaf'
import { createRenderElement } from './render/renderElement'
import type { CoreEditorProps } from './types'
import styles from "./styles.module.less";
/**
 * 主编辑器组件
 */
const Editor = ({ initialValue }: CoreEditorProps) => {
  const editor = useMemo(() => createEditor(corePlugins), [])

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={(editor) => { 
      console.log(editor)
    }}>
      <Editable
        className={styles.editorContent}
        renderLeaf={createRenderLeaf(corePlugins)}
        renderElement={createRenderElement(corePlugins)}
        placeholder='在文舟上书写你的思绪，随文字流动，记录每一次灵感。'
         onKeyDown={(event) => {
          for (const plugin of corePlugins) {
            plugin.onKeyDown?.(event, editor)
            if (event.defaultPrevented) break
          }
        }}
      />
    </Slate>
  );
};

export default Editor;