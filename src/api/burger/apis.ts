import { burgerApi } from "./base";
import type {
  Burgers,
  BurgerStatus,
} from "../../queryProvider/MainQueryClient";
import { queryOptions } from "@tanstack/react-query";

//here do we only set like the very basics of the api calls ? or custom hooks like this ?
// or this custom hook should not be here but rather in the queryProvider folder

//for the mean time have multiple quries, for cooked, uncooked

/* export const burgerQuery = (params: BurgerStatus) =>
  queryOptions({
    queryKey: ["burgers", params],
    queryFn: async () => {
      const res = await burgerApi.get<Burgers>(`/burger/${params}`);
      return res.data;
    },
    select: (data) => {
      console.log({ unformatted: data });
      return data.map((b) => ({
        ...b,
        id: parseInt(b.id),
      }));
    },
  }); */

const handleUrl = (url: string, id: number | null) =>
  id ? `${url}/${id}` : url;

const burgerKeys = {
  all: ["burgers"] as const,
  cooked: (id: number | null) =>
    [...burgerKeys.all, "cooked", { id: id }] as const,
  uncooked: (id: number | null) =>
    [...burgerKeys.all, "uncooked", { id: id }] as const,
};

export const burgerQueries = {
  cookedQuery: (burgerStatus: BurgerStatus, id: number | null) =>
    queryOptions({
      queryKey: burgerKeys.cooked(id), //hone tell celine that you were doing [burgers.cooked(),id] which is wrong in two ways
      queryFn: async () => {
        const url = handleUrl("/burger/cooked", id);
        const res = await burgerApi.get<Burgers | Burgers[number]>(url);
        return res.data;
      },
      select: (data) => {
        //zabet el type 3m btred any
        // If backend returned a single object → wrap it
        if (!Array.isArray(data)) {
          return [data];
        }

        console.log("anything");
        // If backend returned an array → normalize and return it
        return data.map((b) => ({ ...b, id: parseInt(b.id) }));
      },
      enabled: burgerStatus === "cooked",
      retry: false,
    }),

  uncookedQuery: (burgerStatus: BurgerStatus, id: number | null) =>
    queryOptions({
      queryKey: burgerKeys.uncooked(id),
      queryFn: async () => {
        const url = handleUrl("/burger/uncood", id);
        const res = await burgerApi.get<Burgers | Burgers[number]>(url);
        return res.data;
      },
      select: (data) => {
        // If backend returned a single object → wrap it
        if (!Array.isArray(data) && "id" in data) {
          return [{ ...data, id: parseInt(data.id) }];
        }

        // If backend returned an array → normalize and return it
        return data.map((b) => ({ ...b, id: parseInt(b.id) }));
      },
      enabled: burgerStatus === "uncooked",
      gcTime: 0,
    }),
};
