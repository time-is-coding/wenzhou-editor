import Editor from "@/core/Editor";
import styles from "./style.module.less";

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
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
