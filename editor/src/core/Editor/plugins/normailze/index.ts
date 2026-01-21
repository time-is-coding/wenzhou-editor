import type { SlatePlugin } from "../../types";
import type { NormalizeRule } from "./types";

export * from "./ensureAtLeastOneParagraph";
export * from "./normalizeHeading";
export * from "./removeFalseMark";

interface CreateNormalizePluginOptions {
  rules: NormalizeRule[];
}

export const createNormalizePlugin = (options: CreateNormalizePluginOptions): SlatePlugin => {
  const { rules } = options;

  return {
    key: "normalize",

    withEditor(editor) {
      const { normalizeNode } = editor;

      editor.normalizeNode = (entry) => {
        // 1️⃣ 执行 normalize rules
        for (const rule of rules) {
          const handled = rule(entry, editor);
          if (handled) return;
        }

        // 2️⃣ 交回 Slate 默认 normalize
        normalizeNode(entry);
      };

      return editor;
    },
  };
};
