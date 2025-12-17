import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input, Select } from "antd";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputA from "./InputA";
import InputB from "./InputB";
import InputC from "./InputC";
import styles from "./MainForm.module.css";

const schema = z.object({
  name: z
    .string()
    .max(2, { message: "Name should be at most 2 characters long" })
    .min(1),
  email: z.email(),
  lastName: z.string().min(3),
  role: z.enum(["admin", "user"]),
});

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type FormData = z.infer<typeof schema>;

export default function MainForm() {
  const methods = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "john@example.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await sleep(3000);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <InputA />
          <InputB />
          <InputC />
          <Controller
            name="lastName"
            control={methods.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="Last name"
                style={{
                  border: fieldState.error
                    ? "1px solid red"
                    : "1px solid black",
                }}
              />
            )}
          />

          <Controller
            name="role"
            render={({ field }) => (
              <Select {...field} placeholder="Role">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            )}
          />

          <textarea name="description" placeholder="Description">
            <span>Description</span>
          </textarea>
        </form>
      </FormProvider>
    </>
  );
}
