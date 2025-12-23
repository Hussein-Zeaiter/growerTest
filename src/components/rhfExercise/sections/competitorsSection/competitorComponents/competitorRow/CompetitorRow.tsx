import styles from "./CompetitorRow.module.css";
import { competitorSchema } from "../../../../../../pages/rhfExercise/FormCompetitorPage";
import * as z from "zod";
import { useEditingContext } from "../../../../../../stores/rhfExercise/EditingProvider";
import { Button } from "antd";
import { DeleteFilled, EditOutlined, LinkOutlined } from "@ant-design/icons";

type Competitor = z.infer<typeof competitorSchema>;

interface Props {
  competitor: Competitor;
  onEdit: () => void;
  onRemove: () => void;
}

function CompetitorRow({ competitor, onEdit, onRemove }: Props) {
  const { isEditing } = useEditingContext();

  return (
    <div className={styles.competitorRow}>
      <div className={styles.competitorRowName}>
        <p>{competitor.name}</p>
        <div className={styles.competitorRowUrl}>
          <LinkOutlined />
          <a href={competitor.url} target="_blank" rel="noopener noreferrer">
            {competitor.url}
          </a>
        </div>
      </div>

      {isEditing === null && (
        <div className={styles.competitorRowButtons}>
          <Button htmlType="button" onClick={onEdit} icon={<EditOutlined />} />
          <Button
            htmlType="button"
            onClick={onRemove}
            icon={<DeleteFilled />}
          />
        </div>
      )}
    </div>
  );
}

export default CompetitorRow;
