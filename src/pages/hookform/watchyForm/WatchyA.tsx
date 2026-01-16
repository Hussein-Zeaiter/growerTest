import type { FieldValues, UseFormWatch } from "react-hook-form";

function WatchyA({ watch }: { watch: UseFormWatch<FieldValues> }) {
  const watchedName = watch("name");
  console.log("watchedName", watchedName);
  return (
    <>
      <input type="text" />
    </>
  );
}

export default WatchyA;
