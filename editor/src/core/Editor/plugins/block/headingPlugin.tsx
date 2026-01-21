// core/plugins/marks/bold.ts
import type { BaseEditor } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";
import { toggleHeading } from "../../command";
import type { HeadingLevel } from "../../schema";
import type { SlatePlugin } from "../../types";

export const HEADING_KEY = "heading";
const hotkeyArr = [1, 2, 3, 4, 5, 6].map((i) => `mod+alt+${i}`);
const headingHotkey = hotkeyArr.map((hotkey, index) => ({
    hotkey,
    handler: (editor: BaseEditor & ReactEditor & HistoryEditor) => {
        toggleHeading(editor, index + 1 as HeadingLevel);
    },
}))

export const HeadingPlugin: SlatePlugin = {
    key: HEADING_KEY,
    // 快捷键（事件层）
    // hotkeys: [
    //     ...headingHotkey, {
    //         hotkey: 'enter',
    //         handler: (editor) => { 
    //             insertBreakAtSelection(editor);
    //         }
    //     }
    // ],
    hotkeys: headingHotkey,

    // 事件层


    // 视图层
    renderElement: ({ element, attributes, children }) => {
        if (element.type === HEADING_KEY) {
            const level = element.level || 1;
            const Tag = `h${level}`
            return <Tag {...attributes}>{children}</Tag>;
        }
        return children;
    },


};
