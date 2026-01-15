import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import type { FormInputs } from "../../../../pages/rhfExercise/FormCompetitorPage";
import ErrorMessage from "../../atoms/ErrorMessage";
import SectionTitle from "../../atoms/SectionTitle";
import styles from "./RegionSection.module.css";

const options = [
	{ label: "Shanghai", value: "shanghai" },
	{ label: "Beijing", value: "beijing" },
	{ label: "Chengdu", value: "chengdu" },
];

export default function RegionSection() {
	const {
		formState: { errors },
	} = useFormContext<FormInputs>();
	return (
		<div className={styles.mainBox}>
			<SectionTitle
				title="Regional/Location Selection"
				info="Region of the company"
				required={true}
			/>

			<Controller
				name="region"
				render={({ field }) => (
					<Select
						{...field}
						mode="multiple"
						options={options}
						placeholder="Region"
						className={styles.regionSelect}
						allowClear
					/>
				)}
			/>

			{errors.region && (
				<ErrorMessage message={errors.region.message as string} />
			)}
		</div>
	);
}
