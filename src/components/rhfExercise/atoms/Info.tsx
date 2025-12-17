import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

function Info({ title }: { title: string }) {
  return (
    <Tooltip title={title}>
      <InfoCircleOutlined style={{ color: "gray", fontSize: "16px" }} />
    </Tooltip>
  );
}

export default Info;
