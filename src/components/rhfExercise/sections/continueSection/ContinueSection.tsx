import { Button } from "antd";
import BlueDot from "../../atoms/BlueDot";
import styles from "./ContinueSection.module.css";
import { useFormContext } from "react-hook-form";

export default function ContinueSection() {
  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <div className={styles.mainBox}>
      <div className={styles.noticeBox}>
        <BlueDot />
        <p>Required</p>
      </div>
      <Button htmlType="submit" disabled={!isValid}>
        Continue
      </Button>
    </div>
  );
}
