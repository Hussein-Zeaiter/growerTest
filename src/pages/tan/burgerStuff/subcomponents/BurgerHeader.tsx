import {
  useBurgerId,
  useBurgerStatus,
} from "../../../../stores/burgerStore/BurgerProvider";
import { useQuery } from "@tanstack/react-query";
import { burgerQueries } from "../../../../api/burger/apis";

function BurgerHeader() {
  const burgerStatus = useBurgerStatus();
  const burgerId = useBurgerId();

  const { data: cookedData, isError } = useQuery(
    burgerQueries.cookedQuery(burgerStatus, burgerId)
  );
  const { data: uncookedData } = useQuery(
    burgerQueries.uncookedQuery(burgerStatus, burgerId)
  );

  const data = burgerStatus === "cooked" ? cookedData : uncookedData;

  return (
    <header>
      {isError ? (
        <h2>Error loading burgers</h2>
      ) : (
        <h2>
          Now showing burgers: {burgerStatus} ({data ? data.length : 0})
        </h2>
      )}
    </header>
  );
}

export { BurgerHeader };
