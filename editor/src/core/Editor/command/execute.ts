// core/command/execute.ts
import type { Editor } from "slate";
import type { EditorCommand } from "./types";
import { nanoid } from "nanoid";

export function executeCommand(editor: Editor, command: EditorCommand, origin: "local" | "remote" = "local") {
  const history = (editor as any).historyManager;

  command.execute(editor);

  history?.push({
    id: nanoid(),
    commandKey: command.key,
    origin,
  });
}
