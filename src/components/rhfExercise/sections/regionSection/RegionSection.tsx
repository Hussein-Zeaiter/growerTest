import { Select } from "antd";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "../../atoms/ErrorMessage";
import SectionTitle from "../../atoms/SectionTitle";
import styles from "./RegionSection.module.css";

const options = [
	{ label: "Shanghai", value: "shanghai" },
	{ label: "Beijing", value: "beijing" },
	{ label: "Chengdu", value: "chengdu" },
];

export default function RegionSection() {
	return (
		<div className={styles.mainBox}>
			<SectionTitle
				title="Regional/Location Selection"
				info="Region of the company"
				required={true}
			/>

			<Controller
				name="region"
				render={({ field, fieldState: { error } }) => (
					<>
						<Select
							{...field}
							mode="multiple"
							options={options}
							placeholder="Region"
							className={styles.regionSelect}
							allowClear
						/>

						{error && <ErrorMessage message={error.message as string} />}
					</>
				)}
			/>
		</div>
	);
}
