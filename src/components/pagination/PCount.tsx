export default function PCount({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <span>
      Page {page} of {totalPages}
    </span>
  );
}
