import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type Product = {
  id: number;
  name: string;
};

type PaginatedResponse = {
  data: Product[];
  nextPage: number | null;
};

const fetchProducts = async ({ pageParam = 1 }): Promise<PaginatedResponse> => {
  const res = await axios.get("https://api.escuelajs.co/api/v1/products", {
    params: {
      offset: (pageParam - 1) * 5,
      limit: 5,
    },
  });

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: res.data.map((p: any) => ({ id: p.id, name: p.title })),
    nextPage: res.data.length < 5 ? null : pageParam + 1,
  };
};

export default function InfiniteProducts() {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products-infinite"],
      queryFn: fetchProducts,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  if (isPending) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Infinite Products</h1>

      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map((p) => (
            <div key={p.id}>
              {p.id} - {p.name}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{ marginTop: 20 }}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load more"
            : "No more products"}
      </button>
    </div>
  );
}
