// core/plugins/index.ts
import { BoldPlugin } from "./marks/bold";
import { ItalicPlugin } from "./marks/italic";
import { CodePlugin } from "./marks/code";

export const corePlugins = [BoldPlugin, ItalicPlugin, CodePlugin];
