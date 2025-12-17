import { Select, Input } from "antd";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import styles from "./IndustrySection.module.css";
import Info from "../../atoms/Info";
import BlueDot from "../../atoms/BlueDot";
import { useEffect } from "react";
import ErrorMessage from "../../atoms/ErrorMessage";

const options = [
  { label: "Other", value: "other" },
  { label: "IT", value: "it" },
  { label: "Marketing", value: "marketing" },
  { label: "Finance", value: "finance" },
];

export default function IndustrySection() {
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const industry = useWatch({ control, name: "industry" });
  const isOther = industry === "other";
  console.log(industry);
  console.log(isOther);

  useEffect(() => {
    if (industry !== "other") {
      setValue("otherIndustry", "");
      clearErrors("otherIndustry");
    }
  }, [industry, setValue, clearErrors]);

  return (
    <div className={styles.mainBox}>
      <div className={styles.subBox}>
        <div className={styles.titleHolder}>
          <h3>Industry</h3>
          <Info title="Industry of the company" />
          <BlueDot />
        </div>

        <Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              placeholder="Industry"
              className={styles.select}
            />
          )}
        />
        {errors.industry && (
          <ErrorMessage message={errors.industry.message as string} />
        )}
      </div>

      <div className={`${styles.subBox} ${!isOther && styles.disabledSubBox}`}>
        <div className={styles.titleHolder}>
          <h3>If other, please specify</h3>
          {isOther && <BlueDot />}
        </div>
        <Controller
          name="otherIndustry"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Other industry"
              className={styles.input}
              disabled={!isOther}
            />
          )}
        />
        {errors.otherIndustry && (
          <ErrorMessage message={errors.otherIndustry.message as string} />
        )}
      </div>
    </div>
  );
}
