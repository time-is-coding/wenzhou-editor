import { Editor, Range } from "slate";

export interface MarkdownRuleMatch {
  range: Range;
  text: string;
}

export interface MarkdownRule {
  /** 唯一标识 */
  key: string;

  /** 触发字符 */
  trigger: string | string[];

  /** 是否命中 markdown */
  match: (editor: Editor) => MarkdownRuleMatch | null;

  /** 命中后如何转换 */
  apply: (editor: Editor, match: MarkdownRuleMatch) => void;
}
