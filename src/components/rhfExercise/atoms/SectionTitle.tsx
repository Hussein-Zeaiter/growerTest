import BlueDot from "./BlueDot";
import Info from "./Info";

function SectionTitle({
  title,
  info,
  required = false,
}: {
  title: string;
  info?: string;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {info && <Info title={info} />}
      {required && <BlueDot />}
    </div>
  );
}

export default SectionTitle;
