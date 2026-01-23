
import type { SlatePlugin } from "../../types";

export const PARAGRAPH_KEY = "paragraph";

export const ParagraphPlugin: SlatePlugin = {
    key: PARAGRAPH_KEY,

    // 视图层
    renderElement: ({ element, attributes, children }) => {
        if (element.type === PARAGRAPH_KEY) {
            children = <p {...attributes}>{children}</p>;
            return {
                element: children,
                isHandled: true
            }
        }
        return {element:children};
    },


};
