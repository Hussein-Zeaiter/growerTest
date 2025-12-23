import { Button } from "antd";
import BlueDot from "../../atoms/BlueDot";
import styles from "./ContinueSection.module.css";
import { useFormContext } from "react-hook-form";
import { useEditingContext } from "../../../../stores/rhfExercise/EditingProvider";

export default function ContinueSection() {
  const {
    formState: { isValid },
  } = useFormContext();

  const { isEditing } = useEditingContext();

  const editing = isEditing !== null;

  return (
    <div className={styles.mainBox}>
      <div className={styles.noticeBox}>
        <BlueDot />
        <p>Required</p>
      </div>
      <Button htmlType="submit" disabled={!isValid || editing}>
        Continue
      </Button>
    </div>
  );
}
