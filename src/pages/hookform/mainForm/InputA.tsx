import type { ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";

function InputA() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchedName = useWatch({
    control, //check with celine shu elo 3aze cz it works without it
    name: "name",
  }); //if empty watches everything buuuuuuut renders only component A
  console.log("watchedName", watchedName);
  /* console.log("watchedName using watch", watch("name")); */
  return (
    <div>
      <input type="text" {...register("name")} />
      {errors.name && <span>{errors.name.message as ReactNode}</span>}
      <input type="text" {...register("email")} />
    </div>
  );
}

export default InputA;
