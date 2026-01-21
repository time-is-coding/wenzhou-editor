import { Element } from "slate";

export function isElementType<T extends string>(element: unknown, type: T): element is Element & { type: T } {
  return Element.isElement(element) && element.type === type;
}
