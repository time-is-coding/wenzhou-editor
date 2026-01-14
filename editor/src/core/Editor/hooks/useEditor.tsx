import { useMemo } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import {
  codePlugin,
  formatPlugin,
  headingPlugin,
  listPlugin,
  paragraphPlugin,
  blockQuotePlugin,
  todoListPlugin,
  PluginManager,
} from "../plugin/index";

/**
 * 自定义编辑器Hook，创建并配置编辑器实例
 */
const useEditor = () => {
  // 创建插件管理器实例
  const pluginManager = useMemo(() => {
    const manager = new PluginManager();

    // 注册所有插件，按优先级排序
    manager.registerMany([
      paragraphPlugin,
      headingPlugin,
      listPlugin,
      todoListPlugin,
      blockQuotePlugin,
      codePlugin,
      formatPlugin,
    ]);

    return manager;
  }, []);

  const editor = useMemo(() => {
    // 创建基础编辑器
    let baseEditor = withReact(createEditor());
    // 添加历史记录功能
    baseEditor = withHistory(baseEditor);

    // 扩展编辑器以支持插件命令执行
    const customEditor: any = {
      ...baseEditor,
      executeCommand: (key: string, data?: any) => {
        return pluginManager.executeCommand(customEditor, key, data);
      },
    };

    return customEditor;
  }, []);

  return { editor, pluginManager };
};

export default useEditor;