import { Select, Input } from "antd";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import styles from "./IndustrySection.module.css";
import ErrorMessage from "../../atoms/ErrorMessage";
import SectionTitle from "../../atoms/SectionTitle";

const options = [
  { label: "Other", value: "other" },
  { label: "IT", value: "it" },
  { label: "Marketing", value: "marketing" },
  { label: "Finance", value: "finance" },
];

export default function IndustrySection() {
  const { control, setValue, trigger, clearErrors, unregister } =
    useFormContext();

  const industry = useWatch({ control, name: "industry" });
  const isOther = industry === "other";

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
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                {...field}
                options={options}
                placeholder="Industry"
                className={styles.select}
                onChange={(value) => {
                  field.onChange(value);

                  if (value !== "other") {
                    setValue("otherIndustry", null);
                    clearErrors("otherIndustry");
                    trigger("otherIndustry");
                  }
                }}
              />

              {error && <ErrorMessage message={error.message as string} />}
            </>
          )}
        />
      </div>

      <div
        className={`${styles.subBox} ${!isOther ? styles.disabledSubBox : ""}`}
      >
        <SectionTitle title="If other, please specify" required={isOther} />
        <Controller
          name="otherIndustry"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                {...field}
                placeholder="Other industry"
                className={styles.input}
                disabled={!isOther}
              />
              {error && <ErrorMessage message={error.message as string} />}
            </>
          )}
        />
      </div>
    </div>
  );
}
