import { Select, Input } from "antd";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import styles from "./IndustrySection.module.css";
import { useEffect } from "react";
import ErrorMessage from "../../atoms/ErrorMessage";
import SectionTitle from "../../atoms/SectionTitle";

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
    trigger,
    clearErrors,
    formState: { errors }, //use fieldState try to avoid the formState
  } = useFormContext();

  const industry = useWatch({ control, name: "industry" });
  const isOther = industry === "other";
  /*   console.log(industry);
  console.log(isOther); */

  /* console.log(errors); */

  useEffect(() => {
    if (industry !== "other") {
      setValue("otherIndustry", null);
      clearErrors("otherIndustry");
      trigger("otherIndustry");
    } //put in the onchange //research forward ref //incase industry was not other, can we remove the otherIndustry field, check this after the competitor thing //switch otherIndustry to native input no controller!
  }, [industry, setValue, clearErrors, trigger]);

  return (
    <div className={styles.mainBox}>
      <div className={styles.subBox}>
        <SectionTitle
          title="Industry"
          info="Industry of the company"
          required
        />

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
          <ErrorMessage message={errors.industry.message?.toString()} />
        )}
      </div>

      <div
        className={`${styles.subBox} ${!isOther ? styles.disabledSubBox : ""}`}
      >
        <SectionTitle title="If other, please specify" required={isOther} />
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
