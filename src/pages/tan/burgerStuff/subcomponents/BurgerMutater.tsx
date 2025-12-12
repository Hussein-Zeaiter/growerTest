import { useBurgerMutations } from "../../../../api/burger/mutations";

function BurgerMutater() {
  const addCookedBurger = useBurgerMutations.useAddCookedBurger();
  const addUncookedBurger = useBurgerMutations.useAddUncookedBurger();

  function handleCookedSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = "added cooked burger";
    const status = "cooked";
    const id = Math.floor(Math.random() * 1000).toString();

    addCookedBurger.mutate(
      { id, status, name },
      { onSuccess: () => console.log("success") }
    );
  }

  function handleUncookedSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = "added uncooked burger";
    const status = "uncooked";
    const id = Math.floor(Math.random() * 1000).toString();

    addUncookedBurger.mutate({ id, status, name });

    console.log(addUncookedBurger.isPending);
  }

  return (
    <>
      <h1>Add a Cooked Burger</h1>
      {addCookedBurger.isPending && <p>Adding cooked burger...</p>}
      {addCookedBurger.isError && (
        <p>
          Error:
          {addCookedBurger.error.message}
        </p>
      )}
      {addCookedBurger.isSuccess && <p>Success!</p>}

      <form onSubmit={handleCookedSubmit}>
        <button type="submit" disabled={addCookedBurger.isPending}>
          Add Cooked Burger
        </button>
      </form>

      <hr />

      <h1>Add an Uncooked Burger</h1>
      {addUncookedBurger.isPending && <p>Adding uncooked burger...</p>}
      {addUncookedBurger.isError && (
        <p>
          Error:
          {addUncookedBurger.error.message}
        </p>
      )}
      {addUncookedBurger.isSuccess && <p>Success!</p>}
      <form onSubmit={handleUncookedSubmit}>
        <button type="submit" disabled={addUncookedBurger.isPending}>
          Add Uncooked Burger
        </button>
      </form>
    </>
  );
}

export { BurgerMutater };
