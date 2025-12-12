import {
  useBurgerId,
  useBurgerStatus,
} from "../../../../stores/burgerStore/BurgerProvider";
import { burgerQueries } from "../../../../api/burger/apis";
import { useQuery } from "@tanstack/react-query";
import { useBurgerMutations } from "../../../../api/burger/mutations";

function BurgerList() {
  const burgerId = useBurgerId();
  const burgerStatus = useBurgerStatus();

  const addCookingPending =
    useBurgerMutations.useCheckBurgerPending("addCookedBurger");
  const addUncookingPending =
    useBurgerMutations.useCheckBurgerPending("addUncookedBurger");

  const {
    data: cookedData,
    isLoading: isLoadingCooked,
    isError: isErrorCooked,
    error: errorCooked,
  } = useQuery(burgerQueries.cookedQuery(burgerStatus, burgerId));

  const {
    data: uncookedData,
    isLoading: isLoadingUncooked,
    isError: isErrorUncooked,
    error: errorUncooked,
  } = useQuery(burgerQueries.uncookedQuery(burgerStatus, burgerId));

  const data = burgerStatus === "cooked" ? cookedData : uncookedData;

  console.log({ data });

  if (isLoadingCooked || isLoadingUncooked) return <div>Loading...</div>;

  if (isErrorCooked || isErrorUncooked)
    return <div>Error: {String(errorCooked || errorUncooked)}</div>;

  return (
    <>
      {addCookingPending ? (
        <div>Adding cooked burger...</div>
      ) : addUncookingPending ? (
        <div>Adding uncooked burger...</div>
      ) : (
        <ul>
          {data?.map((b) => (
            <li key={b.id}>
              {b.id.toFixed(2)} {b.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export { BurgerList };
