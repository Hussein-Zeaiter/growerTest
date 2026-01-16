import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useEditingContext } from "../../../../stores/rhfExercise/EditingProvider";
import SectionTitle from "../../atoms/SectionTitle";
import CompetitorEditor from "../../molecules/competitorEditor/CompetitorEditor";
import CompetitorRow from "../../molecules/competitorRow/CompetitorRow";
import styles from "./CompetitorSection.module.css";

function CompetitorSection() {
	const { isEditing, setIsEditing } = useEditingContext();

	const {
		getValues,
		setValue,
		clearErrors,
		formState: { isValidating },
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		name: "competitors",
	});

	const competitors = useWatch({ name: "competitors" });

	//this is done here to combat the issue of error persisting on 1st competitor
	const pendingClearRef = useRef(false);
	useEffect(() => {
		if (pendingClearRef.current && !isValidating) {
			clearErrors("competitors");
			pendingClearRef.current = false;
		}
	}, [isValidating, clearErrors]);

	//ADDING
	const handleAddCompetitor = async () => {
		const newCompetitor = {
			name: "",
			url: "",
			differentiator: "",
		};

		setIsEditing({
			fieldId: "",
			index: fields.length,
			isNewlyAdded: true,
			originalValue: structuredClone(newCompetitor),
		});

		append(newCompetitor);
	};

	//CANCELING
	const handleCancelEditing = (index: number) => {
		const oldValues = isEditing?.originalValue;

		if (isEditing?.isNewlyAdded) {
			remove(index);
			if (index === 0) {
				pendingClearRef.current = true;
			}
		} else {
			setValue(`competitors.${index}`, oldValues, {
				shouldDirty: false,
				shouldTouch: false,
				shouldValidate: false,
			});
		}
		setIsEditing(null);
	};

	//EDITING
	const handleEditComepetitor = (index: number) => {
		setIsEditing({
			fieldId: fields[index].id,
			index,
			isNewlyAdded: false,
			originalValue: structuredClone(getValues("competitors")[index]),
		});
	};

	//SAVING
	const handleSaveCompetitor = () => {
		setIsEditing(null);
	};

	//REMOVE
	const handleRemoveCompetitor = (index: number) => {
		if (index === 0 && fields.length === 1) {
			alert("Must have at least one competitor");
			return;
		} else {
			remove(index);
		}
	};

	return (
		<div className={styles.competitorsSection}>
			<SectionTitle
				title="Add Your Competitors"
				info="Whatever competitors you have"
			/>

			<div className={styles.competitorsContainer}>
				{fields.length > 0 ? (
					fields.map((field, index) => {
						const competitor = competitors?.[index];
						const isRowEditing = isEditing?.index === index;

						return (
							<div key={field.id}>
								{!isRowEditing ? (
									<CompetitorRow
										competitor={competitor}
										onEdit={() => handleEditComepetitor(index)}
										onRemove={() => handleRemoveCompetitor(index)}
									/>
								) : (
									<CompetitorEditor
										index={index}
										handleSaveCompetitor={() => handleSaveCompetitor()}
										handleCancelEditing={() => handleCancelEditing(index)}
									/>
								)}
							</div>
						);
					})
				) : (
					<div>
						<p className={styles.noCompetitors}>No competitors added</p>
					</div>
				)}
			</div>
			{!isEditing && (
				<Button
					htmlType="button"
					onClick={handleAddCompetitor}
					icon={<PlusOutlined />}
					disabled={fields.length >= 3}
				>
					Add Competitor
				</Button>
			)}
		</div>
	);
}

export default CompetitorSection;
