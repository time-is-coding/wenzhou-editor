// core/plugins/hotkey/HotkeyPlugin.ts
import type { SlatePlugin } from "../../types";
import { isHotkey } from "is-hotkey";
import type { HotkeyConfig } from "../../types";

export const createHotkeyPlugin = (plugins: SlatePlugin[]): SlatePlugin => {
  // 收集所有插件的 hotkeys
  const hotkeyMap: HotkeyConfig[] = [];

  plugins.forEach((plugin) => {
    if (plugin.hotkeys) {
      hotkeyMap.push(...plugin.hotkeys);
    }
  });

  return {
    key: "hotkey",

    onKeyDown: (event, editor) => {
      for (const { hotkey, handler } of hotkeyMap) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault();
          handler(editor);
          break;
        }
      }
    },
  };
};
