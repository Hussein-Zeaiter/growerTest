import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormCompetitor from "../../components/rhfExercise/FormCompetitor";

const schema = z
  .object({
    industry: z.string().nonempty("Industry is required"),
    otherIndustry: z
      .string()
      .max(10, "Enter At most 10 characters")
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable(), //checkkk
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
