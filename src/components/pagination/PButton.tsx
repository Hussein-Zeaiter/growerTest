interface PButtonProps {
  page: number;
  totalPages: number;
  type: "first" | "prev" | "next" | "last";
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function PButton({ page, totalPages, type, setPage }: PButtonProps) {
  // label based on type
  const label = {
    first: "First",
    prev: "Prev",
    next: "Next",
    last: "Last",
  }[type];

  // disabled logic based on type
  const disabled =
    type === "first" || type === "prev"
      ? page === 1
      : type === "next" || type === "last"
        ? page === totalPages
        : false;

  // click logic based on type
  const handleClick = () => {
    switch (type) {
      case "first":
        setPage(1);
        break;
      case "prev":
        setPage((p) => Math.max(0, p - 1));
        break;
      case "next":
        setPage((p) => Math.min(totalPages, p + 1));
        break;
      case "last":
        setPage(totalPages);
        break;
    }
  };

  console.log({ page, totalPages });

  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default PButton;
