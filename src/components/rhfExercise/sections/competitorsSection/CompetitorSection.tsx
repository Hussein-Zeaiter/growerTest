import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import SectionTitle from "../../atoms/SectionTitle";
import { competitorSchema } from "./../../../../pages/rhfExercise/FormCompetitorPage";
import * as z from "zod";

type Competitor = z.infer<typeof competitorSchema>;

interface EditingCompetitor {
  fieldId: string;
  index: number;
  isNewlyAdded: boolean;
  originalValue: Competitor | null;
}

function CompetitorSection() {
  const [isEditing, setIsEditing] = useState<EditingCompetitor | null>(null);
  /* const [canSaveEdit, setCanSaveEdit] = useState(false); */

  const {
    register,
    getValues,
    setValue,
    getFieldState,
    resetField,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  /*  const handleInputChange = async (
    index: number,
    fieldName: keyof Competitor,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Call RHF's default onChange
    register(`competitors.${index}.${fieldName}`).onChange(e);

    // Trigger validation for this field
    const isValidCurrent = await trigger(`competitors.${index}.${fieldName}`);

    // Trigger validation for the other field in the row
    const otherField = fieldName === "name" ? "url" : "name";
    const isValidOther = await trigger(`competitors.${index}.${otherField}`);

    // Set editing state based on both fields
    setCanSaveEdit(isValidCurrent && isValidOther);
  };
 */
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

  //Reset the bad boys
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

    console.log(oldValues);

    if (isEditing?.isNewlyAdded) {
      handleReset(index);
      remove(index);
    } else {
      setValue(`competitors.${index}`, isEditing?.originalValue, {
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
    handleReset(index);
    remove(index);
  };

  return (
    <>
      <SectionTitle
        title="Add Your Competitors"
        info="Whatever competitors you have"
      />

      <div>
        {fields.length > 0 ? (
          fields.map((field, index) => {
            const competitor = getValues("competitors")[index];
            const isRowEditing = isEditing?.index === index;
            /*  const fieldNamePath = `competitors.${index}.name`;
            const fieldUrlPath = `competitors.${index}.url`;

            const nameState = getFieldState(fieldNamePath);
            const urlState = getFieldState(fieldUrlPath);

            console.log("name state", nameState);
            console.log("url state", urlState); */

            return (
              <div key={field.id}>
                {!isRowEditing ? (
                  <>
                    <p>{competitor.name}</p>
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {competitor.url}
                    </a>

                    {!isEditing && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEditComepetitor(index)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveCompetitor(index)}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <input
                        {...register(`competitors.${index}.name`)}
                        placeholder="Name"
                      />
                      {errors.competitors?.root?.message && (
                        <p className="error">
                          {errors.competitors?.root?.message as string}
                        </p>
                      )}

                      {Array.isArray(errors.competitors) &&
                        errors.competitors[index] && (
                          <>
                            {errors.competitors[index]?.name?.message && (
                              <p>{errors.competitors[index].name.message}</p>
                            )}
                          </>
                        )}
                    </div>

                    <div>
                      <input
                        {...register(`competitors.${index}.url`)}
                        placeholder="URL"
                      />

                      {Array.isArray(errors.competitors) &&
                        errors.competitors[index] && (
                          <>
                            {errors.competitors[index]?.url?.message && (
                              <p>{errors.competitors[index].url.message}</p>
                            )}
                          </>
                        )}
                    </div>

                    <input
                      {...register(`competitors.${index}.differentiator`)}
                      placeholder="Differentiator"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveCompetitor()}
                      disabled={
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
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelEditing(index)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div>
            <p>No competitors added</p>
          </div>
        )}
        {!isEditing && (
          <button type="button" onClick={handleAddCompetitor}>
            Add Competitor
          </button>
        )}
      </div>
    </>
  );
}

export default CompetitorSection;
