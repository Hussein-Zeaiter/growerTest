import { Button } from "antd";
import BlueDot from "../../atoms/BlueDot";
import styles from "./ContinueSection.module.css";

export default function ContinueSection() {
  return (
    <div className={styles.mainBox}>
      <div className={styles.noticeBox}>
        <BlueDot />
        <p>Required</p>
      </div>
      <Button htmlType="submit">Continue</Button>
    </div>
  );
}
