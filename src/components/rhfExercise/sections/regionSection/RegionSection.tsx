import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import type { FormInputs } from "../../../../pages/rhfExercise/FormCompetitorPage";
import SectionTitle from "../../atoms/SectionTitle";
import styles from "./RegionSection.module.css";
import ErrorMessage from "../../atoms/ErrorMessage";

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
            /* suffixIcon={<Button className={styles.addButton}>Add</Button>} */
          />
        )}
      />

      {errors.region && (
        <ErrorMessage message={errors.region.message as string} />
      )}
    </div>
  );
}
