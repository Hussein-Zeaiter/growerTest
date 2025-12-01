export default function PTitle({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <h2>
      Users (page {page} / {totalPages})
    </h2>
  );
}
