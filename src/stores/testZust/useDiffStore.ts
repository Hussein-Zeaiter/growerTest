import { create } from "zustand";

interface State {
  count: number;
  name: string;
  actions: {
    incCount: (incBy: number) => void;
    setName: (name: string) => void;
  };
}

const useDiffStore = create<State>((set) => ({
  count: 0,
  name: "Hussein",
  actions: {
    incCount: (incBy: number) =>
      set((state) => ({
        count: state.count + incBy,
      })),
    setName: (name: string) =>
      set({
        name,
      }),
  },
}));

const useGetCount = () => useDiffStore((state) => state.count);
const useGetName = () => useDiffStore((state) => state.name);
const useIncCount = () => useDiffStore((state) => state.actions.incCount);
const useSetName = () => useDiffStore((state) => state.actions.setName);

export { useGetCount, useGetName, useIncCount, useSetName };
