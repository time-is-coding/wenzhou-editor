// core/command/types.ts
import type { Editor } from "slate";

export interface EditorCommand {
  key: string;
  execute(editor: Editor): void;
}
