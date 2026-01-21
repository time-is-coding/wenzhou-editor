import { Editor, Transforms } from "slate";
import type { Path } from "slate";
import type { HeadingLevel } from "../../schema";
import { toggleHeading } from "./toggleHeading";

export interface ApplyHeadingFromMarkdownOptions {
  path: Path;
  level: HeadingLevel;
}

export function applyHeadingFromMarkdown(editor: Editor, options: ApplyHeadingFromMarkdownOptions) {
  const { path, level } = options;

  Editor.withoutNormalizing(editor, () => {
    // 1. 删除整行的 markdown 语法 (#)
    Transforms.delete(editor, {
      at: Editor.range(editor, path),
    });

    // 2. 切换为 heading
    toggleHeading(editor, level);
  });
}
