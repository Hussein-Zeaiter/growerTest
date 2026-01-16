import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

function InputB() {
  const {
    register,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useFormContext();

  console.log("errors", errors);
  return (
    <div>
      <input type="text" {...register("email")} />
      {errors.email && <span>{errors.email.message as ReactNode}</span>}
      <input type="submit" disabled={isSubmitting} />

      <button
        type="button"
        onClick={() =>
          setError("email", {
            type: "manual",
            message: "Manual error is set",
          })
        }
      >
        set error
      </button>

      {isDirty && <span>Dirty</span>}
    </div>
  );
}

export default InputB;
