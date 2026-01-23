// core/plugins/index.ts
import { BoldPlugin, StrikethroughPlugin, ItalicPlugin, CodePlugin } from "./marks";
import { BOLD_KEY, ITALIC_KEY, CODE_KEY, STRIKETHROUGH_KEY } from "./marks";
import { createHotkeyPlugin } from "./hotkey/hotkey";
import { createNormalizePlugin } from "./normailze";
import { removeFalseMark, ensureAtLeastOneParagraph, normalizeHeading } from "./normailze";
import {
  markdownBoldRule,
  markdownInlineCodeRule,
  markdownItalicRule,
  markdownStrikethroughRule,
  markdownHeadingRule,
  createMarkdownPlugin,
} from "./markdown";
import { HeadingPlugin, ParagraphPlugin } from "./block";

// markdownPlugin
const markdownPlugin = createMarkdownPlugin({
  rules: [markdownBoldRule, markdownItalicRule, markdownInlineCodeRule, markdownStrikethroughRule, markdownHeadingRule],
});

// 结构化数据
const normalizePlugin = createNormalizePlugin({
  rules: [
    normalizeHeading,
    ensureAtLeastOneParagraph,
    removeFalseMark(BOLD_KEY),
    removeFalseMark(ITALIC_KEY),
    removeFalseMark(CODE_KEY),
    removeFalseMark(STRIKETHROUGH_KEY),
  ],
});

// leaf插件
export const markPlugins = [BoldPlugin, ItalicPlugin, CodePlugin, StrikethroughPlugin];
// block插件
export const blockPlugins = [HeadingPlugin, ParagraphPlugin];
// export const blockPlugins = [];

// 快捷键
const hotkeyPlugin = createHotkeyPlugin([...markPlugins, ...blockPlugins]);
// 这里的顺序非常重要
export const corePlugins = [normalizePlugin, markdownPlugin, hotkeyPlugin, ...blockPlugins, ...markPlugins];
