// core/plugins/index.ts
import { BoldPlugin, StrikethroughPlugin, ItalicPlugin, CodePlugin } from "./marks";
import { BOLD_KEY, ITALIC_KEY, CODE_KEY, STRIKETHROUGH_KEY } from "./marks";
import { HotkeyPlugin } from "./hotkey/hotkey";
import { createNormalizePlugin } from "./normailze";
import { removeFalseMark } from "./normailze/removeFalseMark";
import { ensureAtLeastOneParagraph } from "./normailze/ensureAtLeastOneParagraph";
import { markdownBoldRule, markdownInlineCodeRule, markdownItalicRule, createMarkdownPlugin } from "./markdown";

// markdownPlugin
const markdownPlugin = createMarkdownPlugin({
  rules: [markdownBoldRule, markdownItalicRule, markdownInlineCodeRule],
});

// 结构化数据
const normalizePlugin = createNormalizePlugin({
  rules: [
    ensureAtLeastOneParagraph,
    removeFalseMark(BOLD_KEY),
    removeFalseMark(ITALIC_KEY),
    removeFalseMark(CODE_KEY),
    removeFalseMark(STRIKETHROUGH_KEY),
  ],
});

// 基础插件
export const markPlugins = [BoldPlugin, ItalicPlugin, CodePlugin, StrikethroughPlugin];

// 快捷键
const hotkeyPlugin = HotkeyPlugin(markPlugins);
// 这里的顺序非常重要
export const corePlugins = [normalizePlugin, markdownPlugin, hotkeyPlugin, ...markPlugins];
