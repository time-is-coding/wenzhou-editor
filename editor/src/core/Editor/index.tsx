import { createEditor, type Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import styles from "./styles.module.less";
import { useMemo } from "react";

/**
 * 编辑器组件的初始值，提供Markdown示例
 */
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: "" }
    ],
  }
];

/**
 * 主编辑器组件
 */
const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        className={styles.editor}
        placeholder="支持markdown的富文本编辑器"
      />
    </Slate>
  );
};

export default Editor;