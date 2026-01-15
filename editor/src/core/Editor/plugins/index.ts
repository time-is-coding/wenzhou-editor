// core/plugins/index.ts
import { BoldPlugin } from "./marks/bold";
import { ItalicPlugin } from "./marks/italic";
import { CodePlugin } from "./marks/code";
import { HotkeyPlugin } from "./hotkey/hotkey";
import { createNormalizePlugin } from "./normailze/createNormalizePlugin";
import { removeFalseMark } from "./normailze/removeFalseMark";
import { BOLD_KEY, ITALIC_KEY, CODE_KEY } from "./marks";
import { ensureAtLeastOneParagraph } from "./normailze/ensureAtLeastOneParagraph";
import { createMarkdownPlugin } from "./markdown";
import { markdownBoldRule } from "./markdown/markdownBoldRule";

// markdownPlugin
const markdownPlugin = createMarkdownPlugin({
  rules: [markdownBoldRule],
});

// 结构化数据
const normalizePlugin = createNormalizePlugin({
  rules: [ensureAtLeastOneParagraph, removeFalseMark(BOLD_KEY), removeFalseMark(ITALIC_KEY), removeFalseMark(CODE_KEY)],
});

// 基础插件
export const basePlugins = [BoldPlugin, ItalicPlugin, CodePlugin];

// 快捷键
const hotkeyPlugin = HotkeyPlugin(basePlugins);

// 这里的顺序非常重要
export const corePlugins = [normalizePlugin, markdownPlugin, hotkeyPlugin, ...basePlugins];
