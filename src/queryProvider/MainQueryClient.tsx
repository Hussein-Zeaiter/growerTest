/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//these types should be in a separate file normally

export type BurgerStatus = "cooked" | "uncooked";
export type Burger = {
  id: string;
  status: BurgerStatus;
  name: string;
};
export type Burgers = ReadonlyArray<Burger>;

const queryClient = new QueryClient();

function MainQueryClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { MainQueryClient };
