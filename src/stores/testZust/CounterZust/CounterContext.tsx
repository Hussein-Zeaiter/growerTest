import { createContext } from "react";
import type { StoreApi } from "zustand";

export type CounterContextType = {
  count: number;
  actions: {
    inc: () => void;
  };
};

//ask celine is this the best type for the object returned by zustands's createStore
//also ask just to clarify generics
export const CounterContext =
  createContext<StoreApi<CounterContextType> | null>(null);
