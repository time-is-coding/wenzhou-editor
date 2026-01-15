import Editor from "@/core/Editor";
import styles from "./style.module.less";

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "加粗",
        italic: true
      },
    ]
  }
]
const EditorPage = () => {
  return (
    <div className={styles.editorPage}>
      <div className={styles.editorBox}>
        <Editor initialValue={initialValue} />
      </div>
    </div>
  );
};

export default EditorPage;
