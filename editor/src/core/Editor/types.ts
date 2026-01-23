// core/types.ts
import { Editor, type Descendant } from "slate";
import type { RenderLeafProps, RenderElementProps } from "slate-react";
import type { ReactElement } from "react";

export interface CoreEditorProps {
  initialValue: Descendant[];
}

export type HotkeyHandler = (editor: Editor) => void;

export interface HotkeyConfig {
  hotkey: string;
  handler: HotkeyHandler;
}

export interface SlatePlugin {
  key: string;

  /** 扩展 editor 行为 */
  withEditor?: (editor: Editor) => Editor;

  /** 渲染 leaf（文本 mark） */
  renderLeaf?: (props: RenderLeafProps) => ReactElement | null;

  /** 渲染 element（块级） */
  renderElement?: (props: RenderElementProps) => { element: ReactElement; isHandled?: boolean };

  /** 键盘事件 */
  onKeyDown?: (event: React.KeyboardEvent, editor: Editor) => void;

  /** 节点规范化 */
  normalizeNode?: (entry: [any, any], editor: Editor) => void;

  /** ⭐ 新增：插件注册的快捷键 */
  hotkeys?: HotkeyConfig[];
}
