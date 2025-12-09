import { useContext } from "react";
import { useStore } from "zustand";
import { CounterContext } from "./CounterContext";
import type { CounterContextType } from "./CounterContext";

//very confused about the generic T here, check with celine tmrw
const useCountStore = <T>(selector: (state: CounterContextType) => T): T => {
  const store = useContext(CounterContext);

  if (!store) {
    throw new Error("Missing provider, only call within a provider.");
  }

  return useStore(store, selector);
};

export const useCount = () => useCountStore((state) => state.count);
export const useCountActions = () => useCountStore((state) => state.actions);
