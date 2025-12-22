/* eslint-disable react-refresh/only-export-components */
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormCompetitor from "../../components/rhfExercise/FormCompetitor";

export const competitorSchema = z.object({
  name: z.string().min(3, "Please enter a valid name").max(20, "Too Long"),
  url: z.url("Please enter a valid URL"),
  differentiator: z.string().optional(),
});

const schema = z
  .object({
    competitors: z
      .array(competitorSchema)
      .min(1, "Please add at least one competitor")
      .max(3, "Please add at most 3 competitors"),
    industry: z.string().nonempty("Industry is required"),
    otherIndustry: z
      .string()
      .max(10, "Enter At most 10 characters")
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable(), //check
    region: z.array(z.string()).nonempty("Region is required"),
  })
  .superRefine((data, ctx) => {
    // industry → otherIndustry rule
    if (data.industry === "other" && !data.otherIndustry) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter the industry",
        path: ["otherIndustry"],
      });
    }

    // competitors uniqueness
    const nameMap = new Map<string, number>();

    data.competitors.forEach((competitor, index) => {
      const name = competitor.name.trim().toLowerCase();

      if (nameMap.has(name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom, //this needs fixing check zod docs
          message: "Competitor name must be unique",
          path: ["competitors", index, "name"],
        });
      } else {
        nameMap.set(name, index);
      }
    });
  });

export type FormInputs = z.infer<typeof schema>;

function FormCompetitorPage() {
  const methods = useForm<FormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      competitors: [],
      industry: "",
      otherIndustry: null,
      region: [],
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <FormCompetitor />
    </FormProvider>
  );
}

export default FormCompetitorPage;
