import { PARAGRAPH, HEADING, UL_LIST, LIST_ITEM, CODE_BLOCK, BLOCK_QUOTE, TODO_LIST } from "./const";

// 定义基础文本节点类型
interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
}

// 定义列表项节点类型
interface ListItemNode {
  type: typeof LIST_ITEM;
  checked?: boolean;
  children: TextNode[];
}

// 定义不同类型的元素节点
interface ParagraphElement {
  type: typeof PARAGRAPH;
  children: TextNode[];
}

interface HeadingElement {
  type: typeof HEADING;
  level: number;
  children: TextNode[];
}

interface UlListElement {
  type: typeof UL_LIST;
  children: ListItemNode[];
}

interface TodoListElement {
  type: typeof TODO_LIST;
  children: ListItemNode[];
}

interface CodeBlockElement {
  type: typeof CODE_BLOCK;
  language: string;
  children: TextNode[];
}

interface BlockQuoteElement {
  type: typeof BLOCK_QUOTE;
  children: TextNode[];
}

// 组合所有可能的元素类型
type Element = 
  | ParagraphElement
  | HeadingElement
  | UlListElement
  | TodoListElement
  | CodeBlockElement
  | BlockQuoteElement;

export const mockData: Element[] = [
  {
    type: PARAGRAPH,
    children: [{ text: "欢迎使用Markdown编辑器！" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "尝试使用Markdown语法：" }],
  },
  {
    type: HEADING,
    level: 1,
    children: [{ text: "一级标题" }],
  },
  {
    type: HEADING,
    level: 2,
    children: [{ text: "二级标题" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "" }],
  },
  {
    type: UL_LIST,
    children: [
      {
        type: LIST_ITEM,
        children: [{ text: "无序列表项 1" }]
      },
      {
        type: LIST_ITEM,
        children: [{ text: "无序列表项 2" }]
      }
    ]
  },
  {
    type: PARAGRAPH,
    children: [{ text: "" }],
  },
  {
    type: TODO_LIST,
    children: [
      {
        type: LIST_ITEM,
        checked: false,
        children: [{ text: "未完成任务" }]
      },
      {
        type: LIST_ITEM,
        checked: true,
        children: [{ text: "已完成任务" }]
      }
    ]
  },
  {
    type: PARAGRAPH,
    children: [{ text: "" }],
  },
  {
    type: BLOCK_QUOTE,
    children: [{ text: "这是一个引用块" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "" }],
  },
  {
    type: CODE_BLOCK,
    language: "javascript",
    children: [{ text: "console.log('Hello World');" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "" }],
  },
  {
    type: PARAGRAPH,
    children: [
      { text: "这是" },
      { text: "粗体", bold: true },
      { text: "和" },
      { text: "斜体", italic: true },
      { text: "文字。" },
    ],
  },
];