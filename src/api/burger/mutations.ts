import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { burgerApi } from "../../api/burger/base";
import type { Burger } from "../../queryProvider/MainQueryClient";

type burgerMutationKeyTypes = "addCookedBurger" | "addUncookedBurger";

export const useBurgerMutations = {
  useAddCookedBurger: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ["addCookedBurger"],
      mutationFn: async (data: Burger) => {
        const res = await burgerApi.post("/burger/cooked", data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["burgers"] });
      },
    });
  },

  useAddUncookedBurger: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ["addUncookedBurger"],
      mutationFn: async (data: Burger) => {
        const res = await burgerApi.post("/burger/uncooked", data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["burgers"] });
      },
    });
  },

  useCheckBurgerPending: (mutationKey: burgerMutationKeyTypes) =>
    useMutationState({
      filters: { mutationKey: [mutationKey], status: "pending" },
    }).length > 0,
};
