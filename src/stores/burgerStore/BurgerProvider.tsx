/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from "react";
import { createStore, type StoreApi, useStore } from "zustand";

export type BurgerStatus = "cooked" | "uncooked";

type BurgerContextType = {
  burgersStatus: BurgerStatus;
  burgerId: number | null;
  actions: {
    setBurgersStatus: (status: BurgerStatus) => void;
    setBurgerId: (id: number | null) => void;
  };
};

//creation of context
const BurgerContext = createContext<StoreApi<BurgerContextType> | null>(null);

//provider of store to use with other comps
export function BurgerProvider({
  children,
  initialStatus,
}: {
  children: React.ReactNode;
  initialStatus: BurgerStatus;
}) {
  const [store] = useState(() =>
    createStore<BurgerContextType>((set) => ({
      burgersStatus: initialStatus,
      burgerId: null,
      actions: {
        setBurgersStatus: (status: BurgerStatus) =>
          set({ burgersStatus: status }),
        setBurgerId: (id: number | null) => set({ burgerId: id }),
      },
    }))
  );

  return (
    <BurgerContext.Provider value={store}>{children}</BurgerContext.Provider>
  );
}

//actual store hook function
const useBurgerStore = <T,>(selector: (state: BurgerContextType) => T): T => {
  const store = useContext(BurgerContext);

  if (!store) {
    throw new Error("Missing provider, only call within a provider.");
  }
  return useStore(store, selector);
};

//actual hooks to use that of stores
export const useBurgerStatus = () =>
  useBurgerStore((state) => state.burgersStatus);
export const useBurgerId = () => useBurgerStore((state) => state.burgerId);
export const useBurgerActions = () => useBurgerStore((state) => state.actions);
