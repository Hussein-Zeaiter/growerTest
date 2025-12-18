import { useState } from "react";
import { z } from "zod";
import { competitorSchema } from "../../../../../pages/rhfExercise/FormCompetitorPage";

type Competitor = z.infer<typeof competitorSchema>;

type Props = {
  initialValues?: Competitor;
  onSave: (data: Competitor) => void;
  onCancel: () => void;
};

function CompetitorEditor({ initialValues, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Competitor>({
    name: initialValues?.name ?? "",
    url: initialValues?.url ?? "",
    differentiator: initialValues?.differentiator ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof Competitor, string>>
  >({});

  const handleSave = () => {
    const result = competitorSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof Competitor, string>> = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Competitor;
        fieldErrors[key] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSave(result.data);
  };

  return (
    <div>
      <input
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="Competitor name"
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        value={form.url}
        onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
        placeholder="Website URL"
      />
      {errors.url && <p className="error">{errors.url}</p>}

      <input
        value={form.differentiator}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, differentiator: e.target.value }))
        }
        placeholder="Differentiator (optional)"
      />

      <div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CompetitorEditor;
