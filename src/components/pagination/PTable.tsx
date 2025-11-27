// PaginatedUsers.tsx (React + TypeScript or plain JS with small edits)
import Loading from "../utility/Loading";
import Selector from "./Selector";
import ThemeButton from "./ThemeButton";
import useUsers from "./useUsers";
import Error from "../utility/Error";
import PTableHeader from "./PTableHeader";
import PTableRow from "./PTableRow";
import PControls from "./PControls";
import PTitle from "./PTitle";

export default function PTable() {
  //here we call the custom hook to get all of our logic + setters
  const {
    page,
    perPage,
    data,
    totalPages,
    loading,
    error,
    setPage,
    setPerPage,
  } = useUsers();

  // When perPage changes, reset to page 1 (safer)
  //used for selector and done for
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(0); // simple UX: reset to first page
  };

  /*  function handleClick() {
    setCount(count + 1); // count = 0; 0 + 1 = 1
    setCount((prev) => prev + 1); // count = 0; 0 + 1 = 1
  } */

  if (loading) return <Loading />;
  if (error) return <Error err={error} />;

  return (
    <div>
      <PTitle page={page} totalPages={totalPages} />

      {/* <h1>{count}</h1>
      <button onClick={handleClick}>click me</button> */}

      <Selector perPage={perPage} handleChange={handlePerPageChange} />

      <table>
        <PTableHeader />
        <tbody>
          {data.map((u) => (
            <PTableRow u={u} />
          ))}
        </tbody>
      </table>

      <PControls page={page} totalPages={totalPages} setPage={setPage} />

      <ThemeButton />
    </div>
  );
}
