/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
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

// ---------------- Fetch Function ----------------
const fetchProducts = async ({ pageParam = 1 }): Promise<PaginatedResponse> => {
  const res = await axios.get("https://api.escuelajs.co/api/v1/products", {
    params: {
      offset: (pageParam - 1) * 5,
      limit: 5,
    },
  });

  return {
    data: res.data.map((p: any) => ({ id: p.id, name: p.title })),
    nextPage: res.data.length < 5 ? null : pageParam + 1,
  };
};

// ---------------- Component ----------------
export default function InfiniteScrollProducts() {
  const containerRef = useRef<HTMLDivElement>(null); // Scrollable container
  const loadMoreRef = useRef<HTMLDivElement>(null); // Sentinel element

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products-infinite"],
      queryFn: fetchProducts,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  // ---------------- Intersection Observer ----------------
  useEffect(() => {
    if (!loadMoreRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // entries is an array of observed elements
        const firstEntry = entries[0];

        // If the sentinel div is visible AND we have more pages AND we're not fetching
        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // Trigger next page fetch
        }
      },
      {
        root: containerRef.current, // Scrollable container
        rootMargin: "0px", // Margin around root to trigger early/late
        threshold: 1.0, // 0 = as soon as even 1px visible, 1 = fully visible
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <h1>Infinite Scroll Products</h1>

      {/* Scrollable div */}
      <div
        ref={containerRef}
        style={{
          height: 200,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
        }}
      >
        {data?.pages.map((page, i) => (
          <div key={i}>
            {page.data.map((p) => (
              <div key={p.id}>
                {p.id} - {p.name}
              </div>
            ))}
          </div>
        ))}

        {/* Sentinel element at the bottom */}
        <div ref={loadMoreRef} />
      </div>

      {isFetchingNextPage && <div>Loading more...</div>}
      {!hasNextPage && <div>No more products</div>}
    </div>
  );
}
