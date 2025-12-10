import { burgerApi } from "./base";
import type {
  BurgerStatus,
  Burgers,
} from "../../queryProvider/MainQueryClient";
import { queryOptions } from "@tanstack/react-query";

//here do we only set like the very basics of the api calls ? or custom hooks like this ?
// or this custom hook should not be here but rather in the queryProvider folder

export const burgerQuery = (params: BurgerStatus) =>
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
    /*     initialData: [
      {
        id: 1,
        status: "cooked",
        name: "Burger 1",
      },
    ], */
    /* staleTime: 1000 * 60 * 5, //5 minutes
    gcTime: 500, //here it doesnt matter if its fresh or not, if its inactive (which means no component is using it like displaying the data or whatever) for 12 seconds, it will be removed, so next time someone calls it it will fetch again without able to use the cache */
  });
