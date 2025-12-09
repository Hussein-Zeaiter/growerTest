import React from "react";
import { createStore } from "zustand";
import { CounterContext } from "./CounterContext";
import type { CounterContextType } from "./CounterContext";

export function CounterProvider({
  children,
  initialCount = 0,
}: {
  children: React.ReactNode;
  initialCount?: number;
}) {
  console.log("provider rendered");

  const [store] = React.useState(() =>
    createStore<CounterContextType>((set) => ({
      count: initialCount,
      name: "Hussein",
      actions: {
        inc: () => set((state) => ({ count: state.count + 1 })),
      },
    }))
  );

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
}
