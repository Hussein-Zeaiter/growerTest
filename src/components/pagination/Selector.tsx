interface SelectorProps {
  perPage: number;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Selector({ perPage, handleChange }: SelectorProps) {
  return (
    <label>
      Rows per page:
      <select value={perPage} onChange={handleChange}>
        <option value={3}>3</option>
        <option value={25}>25</option>
        <option value={6}>6</option>
        <option value={12}>12</option>
      </select>
    </label>
  );
}

export default Selector;
