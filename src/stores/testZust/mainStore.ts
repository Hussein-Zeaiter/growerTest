import { create } from "zustand";

type Store = {
  count: number;
  name: string;
  inc: () => void;
  chng: () => void;
};

const useCountStore = create<Store>((set) => ({
  count: 0,
  name: "Hussein",
  inc: () => set((state) => ({ count: state.count + 1 })),
  chng: () => set((state) => ({ name: state.name + "!" })),
}));

export { useCountStore };
