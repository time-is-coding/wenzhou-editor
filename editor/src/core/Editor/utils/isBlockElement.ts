import { Editor, Element as SlateElement } from "slate";

export const isBlockElement = (editor: Editor) => {
  return (node: unknown): node is SlateElement => {
    return SlateElement.isElement(node) && Editor.isBlock(editor, node);
  };
};
