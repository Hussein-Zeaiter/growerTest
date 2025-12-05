import React from "react";
import { useStore } from "zustand";
import { CounterContext } from "./CounterContext";

export function useCount() {
  const store = React.useContext(CounterContext);
  if (!store)
    throw new Error("useCount must be used inside <CounterProvider />");
  return useStore(store, (s) => s.count);
}

export function useInc() {
  const store = React.useContext(CounterContext);
  if (!store) throw new Error("useInc must be used inside <CounterProvider />");
  return useStore(store, (s) => s.inc);
}
