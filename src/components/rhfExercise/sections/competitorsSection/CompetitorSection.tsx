import { useState } from "react";
import { useFieldArray, useWatch, useFormContext } from "react-hook-form";
import SectionTitle from "../../atoms/SectionTitle";
import CompetitorEditor from "./competitorEditor/CompetitorEditor";

function CompetitorSection() {
  const { fields, append, update, remove } = useFieldArray({
    name: "competitors",
  });

  const watchedCompetitors = useWatch({ name: "competitors" });

  const [editorOpen, setEditorOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    trigger,
    formState: { errors },
  } = useFormContext();

  const closeEditor = () => {
    setEditorOpen(false);
    setEditIndex(null);
  };

  console.log("errors coming from competitors", errors);
  console.log("error of competitors", errors.competitors);

  return (
    <div>
      <SectionTitle
        title="Add Your Competitors"
        info="Whatever competitors you have"
      />

      {fields.map((field, index) => {
        const competitor = watchedCompetitors?.[index];

        return (
          <div key={field.id}>
            {competitor && (
              <>
                <p>{competitor.name}</p>
                <a
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {competitor.url}
                </a>

                {Array.isArray(errors.competitors) &&
                  errors.competitors[index] && (
                    <div className="error">
                      {errors.competitors[index]?.name?.message && (
                        <p>{errors.competitors[index].name.message}</p>
                      )}
                      {errors.competitors[index]?.url?.message && (
                        <p>{errors.competitors[index].url.message}</p>
                      )}
                    </div>
                  )}
              </>
            )}

            <div>
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditIndex(index);
                  setEditorOpen(true);
                }}
              >
                Update
              </button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => {
          setEditIndex(null);
          setEditorOpen(true);
        }}
      >
        Add Competitor
      </button>

      {editorOpen && (
        <CompetitorEditor
          initialValues={
            editIndex !== null ? watchedCompetitors?.[editIndex] : undefined
          }
          onSave={(data) => {
            if (editIndex !== null) {
              update(editIndex, data);
            } else {
              append(data);
            }
            closeEditor();
            trigger("competitors");
          }}
          onCancel={closeEditor}
        />
      )}
    </div>
  );
}

export default CompetitorSection;
