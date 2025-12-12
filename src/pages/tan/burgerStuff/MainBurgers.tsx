import { BurgerProvider } from "../../../stores/burgerStore/BurgerProvider";
import { BurgerHeader } from "./subcomponents/BurgerHeader";
import { BurgerList } from "./subcomponents/BurgerList";
import { BurgerControl } from "./subcomponents/BurgerControl";
import { BurgerMutater } from "./subcomponents/BurgerMutater";
import type { BurgerStatus } from "../../../stores/burgerStore/BurgerProvider";

function InnerMainBurgers() {
  return (
    <>
      <BurgerHeader />
      {/* filter section (filter thro names + an add button for the mutation thing finsih the filters frst tho) */}
      <BurgerList />
      <BurgerControl />
      <BurgerMutater />
    </>
  );
}

function MainBurgers({ initialStatus }: { initialStatus: BurgerStatus }) {
  return (
    <BurgerProvider initialStatus={initialStatus}>
      <InnerMainBurgers />
    </BurgerProvider>
  );
}

export { MainBurgers };
