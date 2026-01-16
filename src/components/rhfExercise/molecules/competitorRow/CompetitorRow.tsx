import { DeleteFilled, EditOutlined, LinkOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type * as z from "zod";
import type { competitorSchema } from "../../../../pages/rhfExercise/FormCompetitorPage";
import { useEditingContext } from "../../../../stores/rhfExercise/EditingProvider";
import styles from "./CompetitorRow.module.css";

type Competitor = z.infer<typeof competitorSchema>;

interface Props {
	competitor: Competitor;
	onEdit: () => void;
	onRemove: () => void;
}

function CompetitorRow({ competitor, onEdit, onRemove }: Props) {
	const { isEditing } = useEditingContext();
	const isEditingTrue = isEditing !== null;

	return (
		<div className={styles.competitorRow}>
			<div className={styles.competitorRowName}>
				<p>{competitor?.name}</p>
				<div className={styles.competitorRowUrl}>
					<LinkOutlined />
					<a href={competitor?.url} target="_blank" rel="noopener noreferrer">
						{competitor?.url}
					</a>
				</div>
			</div>

			<div className={styles.competitorRowButtons}>
				<Button
					htmlType="button"
					onClick={onEdit}
					icon={<EditOutlined />}
					disabled={isEditingTrue}
				/>
				<Button
					htmlType="button"
					onClick={onRemove}
					icon={<DeleteFilled />}
					disabled={isEditingTrue}
				/>
			</div>
		</div>
	);
}

export default CompetitorRow;
