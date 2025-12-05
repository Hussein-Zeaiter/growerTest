import React from "react";
import { createStore } from "zustand";
import { CounterContext } from "./CounterContext";

export function CounterProvider({
  children,
  initialCount = 0,
}: {
  children: React.ReactNode;
  initialCount?: number;
}) {
  const [store] = React.useState(() =>
    createStore<{ count: number; inc: () => void }>((set) => ({
      count: initialCount,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }))
  );

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
}
