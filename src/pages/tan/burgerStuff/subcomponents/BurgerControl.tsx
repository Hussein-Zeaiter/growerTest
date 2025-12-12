import { useBurgerActions } from "../../../../stores/burgerStore/BurgerProvider";
import { useQueryClient } from "@tanstack/react-query";

function BurgerControl() {
  const { setBurgersStatus, setBurgerId } = useBurgerActions();

  const queryClient = useQueryClient();

  return (
    <div>
      <button
        onClick={() => setBurgersStatus("cooked")}
        style={{ margin: "10px" }}
      >
        Set Burgers to cooked
      </button>
      <button
        onClick={() => setBurgersStatus("uncooked")}
        style={{ margin: "10px" }}
      >
        Set Burgers to uncooked
      </button>

      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["burgers"] })}
      >
        Invalidate Burgers Query
      </button>

      <br />
      <label htmlFor="">Search by number</label>
      <input
        type="number"
        onChange={(e) => setBurgerId(parseInt(e.target.value))}
      />
    </div>
  );
}

export { BurgerControl };
