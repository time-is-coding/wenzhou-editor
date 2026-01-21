import type { SlatePlugin } from "../../types";
import type { MarkdownRule } from "./types";

export * from "./markdownItalicRule";
export * from "./markdownBoldRule";
export * from "./markdownCodeRule";
export * from "./markdownStrikethroughRule";
export * from "./markdownHeadingRule";

interface CreateMarkdownPluginOptions {
  rules: MarkdownRule[];
}

export const createMarkdownPlugin = (options: CreateMarkdownPluginOptions): SlatePlugin => {
  const { rules } = options;

  return {
    key: "markdown",

    onKeyDown(event, editor) {
      for (const rule of rules) {
        const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger];

        if (!triggers.includes(event.key)) continue;

        const match = rule.match(editor);
        if (!match) continue;

        event.preventDefault();
        rule.apply(editor, match);
        return;
      }
    },
  };
};
