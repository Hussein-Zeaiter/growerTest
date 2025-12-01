export default function PTableHeader({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr>
        {columns.map((cl) => (
          <th>{cl}</th>
        ))}
      </tr>
    </thead>
  );
}
