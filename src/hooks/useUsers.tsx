import { useState, useEffect, useCallback } from "react";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

function useUsers() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(3); // try 3, 6, 12
  const [data, setData] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (p: number, pp: number) => {
    setLoading(true);
    setError(null);
    const endp = "https://reqres.in/api/users?page=";
    try {
      const res = await fetch(`${endp}${p}&per_page=${pp}`, {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Resp shape: { page, per_page, total, total_pages, data: [...] }
      setData(json.data);
      setTotalPages(json.total_pages ?? 1);
      // optional: prefetch next page
      if (p < json.total_pages) {
        fetch(`${endp}${p + 1}&per_page=${pp}`).catch(() => {});
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch when page or perPage change
  useEffect(() => {
    fetchPage(page, perPage);
  }, [page, perPage, fetchPage]);

  return {
    page,
    perPage,
    data,
    totalPages,
    loading,
    error,
    setPage,
    setPerPage,
  };
}

export default useUsers;
