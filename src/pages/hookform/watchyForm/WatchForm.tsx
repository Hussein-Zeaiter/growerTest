import { useForm } from "react-hook-form";
import WatchyA from "./WatchyA";
import WatchyB from "./WatchyB";

export default function WatchForm() {
  const { register, handleSubmit, watch } = useForm();

  console.log(watch("name"));

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <WatchyA {...register("name")} watch={watch} />
      <WatchyB />
    </form>
  );
}
