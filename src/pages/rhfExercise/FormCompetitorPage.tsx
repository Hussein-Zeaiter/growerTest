/* eslint-disable react-refresh/only-export-components */
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormCompetitor from "../../components/rhfExercise/FormCompetitor";

export const competitorSchema = z.object({
  name: z.string().min(3).max(20),
  url: z.string().url("Please enter a valid url"),
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
  .refine(
    (data) => {
      if (data.industry === "other") {
        return data.otherIndustry !== null;
      }
      return true;
    },
    {
      message: "Please enter the industry",
      path: ["otherIndustry"],
    }
  );

export type FormInputs = z.infer<typeof schema>;

function FormCompetitorPage() {
  const methods = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      competitors: [
        {
          name: "Twitter",
          url: "https://twitter.com",
          differentiator: "Twitter is batata and bad and everything else",
        },
      ],
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
