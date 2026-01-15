// core/types.ts
import { Editor, type Descendant } from "slate";
import type { RenderLeafProps, RenderElementProps } from "slate-react";
import type { ReactElement } from "react";

export interface CoreEditorProps {
  initialValue: Descendant[];
}

export interface SlatePlugin {
  key: string;

  /** 扩展 editor 行为 */
  withEditor?: (editor: Editor) => Editor;

  /** 渲染 leaf（文本 mark） */
  renderLeaf?: (props: RenderLeafProps) => ReactElement | null;

  /** 渲染 element（块级） */
  renderElement?: (props: RenderElementProps) => ReactElement | null;

  /** 键盘事件 */
  onKeyDown?: (event: React.KeyboardEvent, editor: Editor) => void;
}
