import PButton from "./PButton";
import PCount from "./PCount";

interface PControlsProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PControls({
  page,
  totalPages,
  setPage,
}: PControlsProps) {
  return (
    <div style={{ marginTop: 12 }}>
      <PButton
        type="first"
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
      <PButton
        type="prev"
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <PCount page={page} totalPages={totalPages} />

      <PButton
        type="next"
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
      <PButton
        type="last"
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
