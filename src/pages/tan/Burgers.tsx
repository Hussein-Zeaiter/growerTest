import { burgerQuery } from "../../api/burger/apis";
import type { BurgerStatus } from "../../queryProvider/MainQueryClient";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Burgers() {
  const [state, setState] = useState<BurgerStatus>("cooked");
  const {
    isLoading,
    isPending,
    isFetching,
    isError,
    isEnabled,
    error,
    data,
    status,
    refetch,
  } = useQuery(burgerQuery(state));

  const queryClient = useQueryClient();

  /*   console.log("is Pending status:", isPending);
  console.log("is Fetching status:", isFetching);
  console.log("is loading status:", isLoading);
  console.log("is enabled status:", isEnabled); */
  console.log("overall status:", status);

  console.log({ data });

  /* if (isPending) return <div>Pending...</div>; */

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>showing burgers that are: {state}</h1>

      <ul>
        {data?.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>

      <button onClick={() => setState("cooked")}>show cooked</button>
      <button onClick={() => setState("uncooked")}>show uncooked</button>
      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["burger"] })}
        //here the query key is an array with 2 elements, so it will invalidate both cooked and uncooked queries, which is weird?
      >
        Invalidate Query
      </button>
      {/* <button onClick={() => refetch()}>refetch</button> */}
    </div>
  );
}

export default Burgers;
