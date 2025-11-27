export default function PTitle({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <h2>
      Users (page {page + 1} / {totalPages + 1})
    </h2>
  );
}
