import { useFormContext } from "react-hook-form";
import type { FormInputs } from "../../pages/rhfExercise/FormCompetitorPage";
import styles from "./FormCompetitor.module.css";
import CompetitorSection from "./sections/competitorsSection/CompetitorSection";
import ContinueSection from "./sections/continueSection/ContinueSection";
import IndustrySelection from "./sections/industrySection/IndustrySection";
import RegionSection from "./sections/regionSection/RegionSection";

function FormCompetitor() {
	const { handleSubmit } = useFormContext<FormInputs>();

	const submitLogic = (data: FormInputs) => {
		console.log(data);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(submitLogic)}>
			<div className={styles.formInputSection}>
				<CompetitorSection />
				<IndustrySelection />
				<RegionSection />
			</div>
			<ContinueSection />
		</form>
	);
}

export default FormCompetitor;
