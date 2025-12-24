import { useFieldArray, useFormContext } from "react-hook-form";
import SectionTitle from "../../atoms/SectionTitle";
import { useEditingContext } from "../../../../stores/rhfExercise/EditingProvider";
import CompetitorRow from "../../molecules/competitorRow/CompetitorRow";
import styles from "./CompetitorSection.module.css";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CompetitorEditor from "../../molecules/competitorEditor/CompetitorEditor";

function CompetitorSection() {
  const { isEditing, setIsEditing } = useEditingContext();

  const { getValues, setValue, getFieldState, resetField, clearErrors } =
    useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "competitors",
  });

  //handleDisabledSave
  const handleDisabled = (
    mode: "new" | "old",
    namePath: string,
    urlPath: string
  ) => {
    const nameState = getFieldState(namePath);
    const urlState = getFieldState(urlPath);

    if (mode === "old") {
      return nameState.invalid || urlState.invalid;
    } else {
      return (
        !nameState.isDirty ||
        !urlState.isDirty ||
        nameState.invalid ||
        urlState.invalid
      );
    }
  };

  //Reset Editor Fields
  const handleReset = (index: number) => {
    resetField(`competitors.${index}.name`);
    resetField(`competitors.${index}.url`);
    resetField(`competitors.${index}.differentiator`);
  };

  //ADDING
  const handleAddCompetitor = () => {
    setIsEditing({
      fieldId: "",
      index: fields.length,
      isNewlyAdded: true,
      originalValue: null,
    });

    const newCompetitor = {
      name: "",
      url: "",
      differentiator: "",
    };

    append(newCompetitor);
  };

  //CANCELING
  const handleCancelEditing = (index: number) => {
    const oldValues = isEditing?.originalValue;

    if (isEditing?.isNewlyAdded) {
      handleReset(index);
      remove(index);

      if (fields.length === 0) {
        clearErrors("competitors");
      }
    } else {
      setValue(`competitors.${index}`, oldValues, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      });
    }

    setIsEditing(null);
  };

  //EDITING
  const handleEditComepetitor = (index: number) => {
    setIsEditing({
      fieldId: fields[index].id,
      index,
      isNewlyAdded: false,
      originalValue: structuredClone(getValues("competitors")[index]),
    });
  };

  //SAVING
  const handleSaveCompetitor = () => {
    setIsEditing(null);
  };

  //REMOVE
  const handleRemoveCompetitor = (index: number) => {
    if (index === 0 && fields.length === 1) {
      alert("Must have at least one competitor");
      return;
    } else {
      handleReset(index);
      remove(index);
    }
  };

  return (
    <div className={styles.competitorsSection}>
      <SectionTitle
        title="Add Your Competitors"
        info="Whatever competitors you have"
      />

      <div className={styles.competitorsContainer}>
        {fields.length > 0 ? (
          fields.map((field, index) => {
            const competitor = getValues("competitors")[index];
            const isRowEditing = isEditing?.index === index;

            return (
              <div key={field.id}>
                {!isRowEditing ? (
                  <CompetitorRow
                    competitor={competitor}
                    onEdit={() => handleEditComepetitor(index)}
                    onRemove={() => handleRemoveCompetitor(index)}
                  />
                ) : (
                  <CompetitorEditor
                    index={index}
                    handleSaveCompetitor={() => handleSaveCompetitor()}
                    handleCancelEditing={() => handleCancelEditing(index)}
                    isSaveDisabled={
                      isEditing?.isNewlyAdded
                        ? handleDisabled(
                            "new",
                            `competitors.${index}.name`,
                            `competitors.${index}.url`
                          )
                        : handleDisabled(
                            "old",
                            `competitors.${index}.name`,
                            `competitors.${index}.url`
                          )
                    }
                  />
                )}
              </div>
            );
          })
        ) : (
          <div>
            <p className={styles.noCompetitors}>No competitors added</p>
          </div>
        )}
      </div>
      {!isEditing && (
        <Button
          htmlType="button"
          onClick={handleAddCompetitor}
          icon={<PlusOutlined />}
          disabled={fields.length >= 3}
        >
          Add Competitor
        </Button>
      )}
    </div>
  );
}

export default CompetitorSection;
