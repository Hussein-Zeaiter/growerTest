import { useForm, type SubmitHandler } from "react-hook-form";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z
    .string()
    .max(2, { message: "Name should be at most 2 characters long" })
    .min(1),
  email: z.email(),
});

type FormData = z.infer<typeof schema>;

export default function HookForm() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  console.log("render count:", renderCount.current);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "john@example.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  console.log(watch("name"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />

      {errors.name && <span>{errors.name.message}</span>}

      <br />

      <input {...register("email", { required: true })} />

      {errors.email && <span>This field is required</span>}
      <br />
      <input type="submit" />
    </form>
  );
}
