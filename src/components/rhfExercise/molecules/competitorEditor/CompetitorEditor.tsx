import { Button } from "antd";
import { useState } from "react";
import { useController } from "react-hook-form";
import { useEditingContext } from "../../../../stores/rhfExercise/EditingProvider";
import BlueDot from "../../atoms/BlueDot";
import ErrorMessage from "../../atoms/ErrorMessage";
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
	const original = isEditing?.originalValue;
	const [interactedWithName, setInteractedWithName] = useState(false);
	const [interactedWithUrl, setInteractedWithUrl] = useState(false);

	//NAME FIELD
	const {
		field: nameField,
		fieldState: { invalid: nameInvalid, error: nameError },
	} = useController({
		name: `competitors.${index}.name`,
	});

	//URL FIELD
	const {
		field: urlField,
		fieldState: { invalid: urlInvalid, error: urlError },
	} = useController({
		name: `competitors.${index}.url`,
	});

	const { field: diffField } = useController({
		name: `competitors.${index}.differentiator`,
	});

	const hasChanged =
		original?.name !== nameField.value ||
		original?.url !== urlField.value ||
		original?.differentiator !== diffField.value;

	return (
		<div className={styles.editor}>
			<div className={styles.requiredGrouped}>
				<div className={styles.fieldGroup}>
					<div className={styles.fieldTitle}>
						<p>Competitor Name</p>
						<BlueDot />
					</div>

					<input
						{...nameField}
						placeholder="Enter Competitor Name"
						onChange={(e) => {
							setInteractedWithName(true);
							nameField.onChange(e);
						}}
					/>
					{interactedWithName && nameError && (
						<ErrorMessage message={nameError.message} />
					)}
				</div>

				<div className={styles.fieldGroup}>
					<div className={styles.fieldTitle}>
						<p>Competitor Website URL</p>
						<BlueDot />
					</div>

					<input
						{...urlField}
						placeholder="Enter Website URL"
						onChange={(e) => {
							setInteractedWithUrl(true);
							urlField.onChange(e);
						}}
					/>
					{interactedWithUrl && urlError && (
						<ErrorMessage message={urlError.message} />
					)}
				</div>
			</div>

			<div className={styles.fieldGroup}>
				<p>Differentiator</p>
				<textarea
					{...diffField}
					placeholder="What differentiates you from your competitors (e.g., pricing, product features, customer experience)"
					className={styles.textarea}
				/>
			</div>

			<div className={styles.buttonGroup}>
				<Button
					htmlType="button"
					onClick={handleSaveCompetitor}
					disabled={
						!hasChanged ||
						!nameField.value ||
						!urlField.value ||
						nameInvalid ||
						urlInvalid
					}
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
