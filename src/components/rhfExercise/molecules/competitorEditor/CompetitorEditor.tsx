import { useFormContext } from "react-hook-form";
import ErrorMessage from "../../atoms/ErrorMessage";
import styles from "./CompetitorEditor.module.css";
import BlueDot from "../../atoms/BlueDot";
import { Button } from "antd";

interface EditorProps {
  index: number;
  handleSaveCompetitor: () => void;
  handleCancelEditing: () => void;
  isSaveDisabled: boolean;
}

function CompetitorEditor({
  index,
  handleSaveCompetitor,
  handleCancelEditing,
  isSaveDisabled,
}: EditorProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.editor}>
      <div className={styles.requiredGrouped}>
        <div className={styles.fieldGroup}>
          <div className={styles.fieldTitle}>
            <p>Competitor Name</p>
            <BlueDot />
          </div>

          <input
            {...register(`competitors.${index}.name`)}
            placeholder="Enter Competitor Name"
          />

          {Array.isArray(errors.competitors) && errors.competitors[index] && (
            <>
              {errors.competitors[index]?.name?.message && (
                <ErrorMessage
                  message={errors.competitors[index].name.message}
                />
              )}
            </>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.fieldTitle}>
            <p>Competitor Website URL</p>
            <BlueDot />
          </div>

          <input
            {...register(`competitors.${index}.url`)}
            placeholder="Enter Website URL"
          />

          {Array.isArray(errors.competitors) && errors.competitors[index] && (
            <>
              {errors.competitors[index]?.url?.message && (
                <ErrorMessage message={errors.competitors[index].url.message} />
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <p>Differentiator</p>
        <textarea
          {...register(`competitors.${index}.differentiator`)}
          placeholder="What differentiates you from your competitors (e.g., pricing, product features, customer experience)"
          className={styles.textarea}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button
          htmlType="button"
          onClick={handleSaveCompetitor}
          disabled={isSaveDisabled}
        >
          Save Changes
        </Button>
        <Button htmlType="button" onClick={handleCancelEditing}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default CompetitorEditor;
