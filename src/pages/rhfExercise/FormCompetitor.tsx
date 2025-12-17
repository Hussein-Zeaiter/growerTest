import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z
  .object({
    industry: z.string().nonempty("Industry is required"),
    otherIndustry: z.string().nullable(),
  })
  .refine(
    (data) => {
      if (data.industry === "other") {
        return data.otherIndustry?.trim() !== "";
      }
      return true;
    },
    {
      message: "Please enter the industry",
      path: ["otherIndustry"],
    }
  );

type FormInputs = z.infer<typeof schema>;

function FormCompetitor() {
  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <input type="hidden" name="competitor" value="competitor" />
    </FormProvider>
  );
}

export default FormCompetitor;
