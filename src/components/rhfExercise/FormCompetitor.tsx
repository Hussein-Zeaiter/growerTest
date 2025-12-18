import { useFormContext } from "react-hook-form";
import type { FormInputs } from "../../pages/rhfExercise/FormCompetitorPage";
import IndustrySelection from "./sections/industrySection/IndustrySection";
import ContinueSection from "./sections/continueSection/ContinueSection";
import RegionSection from "./sections/regionSection/RegionSection";
import CompetitorSection from "./sections/competitorsSection/CompetitorSection";
import styles from "./FormCompetitor.module.css";

function FormCompetitor() {
  const { handleSubmit, getValues } = useFormContext<FormInputs>();

  const submitLogic = (data: FormInputs) => {
    console.log(data);
  };

  console.log(getValues());

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
