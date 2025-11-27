export default function PCount({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <span>
      Page {page + 1} of {totalPages + 1}
    </span>
  );
}
