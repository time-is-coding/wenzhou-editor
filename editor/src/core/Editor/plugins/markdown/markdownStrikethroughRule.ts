import { Editor, Range, Text, Point } from "slate";
import type { LeafMarkdownRuleMatch, MarkdownRule } from "./types";
import { isBlockElement } from "../../utils";
import { STRIKETHROUGH_KEY } from "../marks/strikethrough";
import { applyStrikethroughFromMarkdown } from "../../command";

export const markdownStrikethroughRule: MarkdownRule<LeafMarkdownRuleMatch> = {
  key: STRIKETHROUGH_KEY,

  trigger: " ",

  match(editor) {
    const { selection } = editor;
    // 检查是否有选区且选区是否为折叠状态（即光标而非选择区域）
    if (!selection || !Range.isCollapsed(selection)) return null;

    const cursor = selection.anchor; // 获取光标位置
    // 查找当前光标所在的块级元素
    const block = Editor.above(editor, {
      match: isBlockElement(editor),
    });
    if (!block) return null; // 如果没有找到块级元素，则返回

    // 获取当前块的起始位置
    const blockStart = Editor.start(editor, block[1]);
    // 获取从块开始到当前光标位置的文本内容
    const text = Editor.string(editor, {
      anchor: blockStart,
      focus: cursor,
    });

    // 使用正则表达式匹配以 ~~文本~~ 结尾的模式
    const match = text.match(/\~\~([^~]+)\~\~$/);
    if (!match) return null;

    // 计算匹配到的删除线语法的起始位置
    const [textNode, textPath] = Editor.node(editor, cursor);
    if (!Text.isText(textNode)) return null;
    const startOffset = cursor.offset - match[0].length;
    if (startOffset < 0) return null;
    const start: Point = {
      path: textPath,
      offset: startOffset,
    };
    // 返回匹配到的文本内容和范围信息
    return {
      text: match[1],
      range: { anchor: start, focus: cursor },
    };
  },

  /**
   * 应用函数，将匹配到的 Markdown 加粗语法转换为实际的加粗样式
   * @param editor Slate 编辑器实例
   * @param match 包含匹配文本和范围的对象
   */
  apply(editor, match) {
    applyStrikethroughFromMarkdown(editor, match);
  },
};
