import { useFormContext } from "react-hook-form";
import type { FormInputs } from "../../pages/rhfExercise/FormCompetitorPage";
import IndustrySelection from "./sections/industrySection/IndustrySection";
import ContinueSection from "./sections/continueSection/ContinueSection";
import styles from "./FormCompetitor.module.css";

function FormCompetitor() {
  const { handleSubmit } = useFormContext<FormInputs>();

  const submitLogic = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitLogic)}>
      <div className={styles.formInputSection}>
        <IndustrySelection />
      </div>

      <ContinueSection />
    </form>
  );
}

export default FormCompetitor;
