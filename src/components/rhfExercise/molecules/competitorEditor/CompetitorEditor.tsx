import { ErrorMessage } from "@hookform/error-message";
import { Button } from "antd";
import { useFormContext, useWatch } from "react-hook-form";
import { competitorSchema } from "../../../../pages/rhfExercise/FormCompetitorPage";
import { useEditingContext } from "../../../../stores/rhfExercise/EditingProvider";
import BlueDot from "../../atoms/BlueDot";
import { ErrorMessage as CustomError } from "../../atoms/ErrorMessage";
import styles from "./CompetitorEditor.module.css";

interface EditorProps {
	index: number;
	handleSaveCompetitor: () => void;
	handleCancelEditing: () => void;
}

function CompetitorEditor({
	index,
	handleSaveCompetitor,
	handleCancelEditing,
}: EditorProps) {
	const { isEditing } = useEditingContext();
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const original = isEditing?.originalValue;

	const currentCompetitor = useWatch({
		name: `competitors.${index}`,
		defaultValue: original,
	});

	//this is set incase of editing as the editor is used for both
	const hasChanged =
		original?.name !== currentCompetitor?.name ||
		original?.url !== currentCompetitor?.url ||
		original?.differentiator !== currentCompetitor?.differentiator;

	const isCompetitorValid =
		competitorSchema.safeParse(currentCompetitor).success;

	return (
		<div className={styles.editor}>
			<div className={styles.requiredGrouped}>
				<div className={styles.fieldGroup}>
					<div className={styles.fieldTitle}>
						<p>Competitor Name</p>
						<BlueDot />
					</div>

					<input
						{...register(`competitors.${index}.name`)}
						placeholder="Enter Competitor Name"
					/>
					<ErrorMessage
						errors={errors}
						name={`competitors.${index}.name`}
						render={({ message }) => <CustomError message={message} />}
					/>
				</div>

				<div className={styles.fieldGroup}>
					<div className={styles.fieldTitle}>
						<p>Competitor Website URL</p>
						<BlueDot />
					</div>

					<input
						{...register(`competitors.${index}.url`)}
						placeholder="Enter Website URL"
					/>
					<ErrorMessage
						errors={errors}
						name={`competitors.${index}.url`}
						render={({ message }) => <CustomError message={message} />}
					/>
				</div>
			</div>

			<div className={styles.fieldGroup}>
				<p>Differentiator</p>
				<textarea
					{...register(`competitors.${index}.differentiator`)}
					placeholder="What differentiates you from your competitors (e.g., pricing, product features, customer experience)"
					className={styles.textarea}
				/>
			</div>

			<div className={styles.buttonGroup}>
				<Button
					htmlType="button"
					onClick={handleSaveCompetitor}
					disabled={!hasChanged || !isCompetitorValid}
				>
					Save Changes
				</Button>
				<Button htmlType="button" onClick={handleCancelEditing}>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export default CompetitorEditor;
