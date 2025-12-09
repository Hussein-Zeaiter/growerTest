import { create } from "zustand";

type Store = {
  count: number;
  name: string;
  actions: {
    inc: () => void;
    chng: () => void;
  };
};

/* console.log("main store rendered"); */

const useCountStore = create<Store>((set) => ({
  count: 0,
  name: "Hussein",
  actions: {
    inc: () => set((prev) => ({ count: prev.count + 1 })),
    chng: () => set((prev) => ({ name: prev.name + "!" })),
  },
}));

export const useCount = () =>
  useCountStore((state) => {
    console.log("Selector 1 ran"); //check with Celine
    return state.count;
  });

export const useName = () => useCountStore((state) => state.name);
export const useStateActions = () => useCountStore((state) => state.actions);
//did a small mistake here was importing each action on its own, which literally defeats the purpose of combining them into one object
