import React from "react";
import type { StoreApi } from "zustand";

//ask celine is this the best type for the object returned by zustands's createStore
export const CounterContext = React.createContext<StoreApi<{
  count: number;
  inc: () => void;
}> | null>(null);
