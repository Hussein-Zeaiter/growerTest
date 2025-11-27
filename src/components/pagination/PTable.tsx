// PaginatedUsers.tsx (React + TypeScript or plain JS with small edits)
import React, { useEffect, useState, useCallback } from "react";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function PTable() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(3); // try 3, 6, 12
  const [data, setData] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (p: number, pp: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://reqres.in/api/users?page=${p}&per_page=${pp}`,
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Resp shape: { page, per_page, total, total_pages, data: [...] }
      setData(json.data);
      setTotalPages(json.total_pages ?? 1);
      // optional: prefetch next page
      if (p < json.total_pages) {
        fetch(`https://reqres.in/api/users?page=${p + 1}&per_page=${pp}`).catch(
          () => {}
        );
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

  // When perPage changes, reset to page 1 (safer)
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(1); // simple UX: reset to first page
  };

  return (
    <div>
      <h2>
        Users (page {page} / {totalPages})
      </h2>

      <label>
        Rows per page:
        <select value={perPage} onChange={handlePerPageChange}>
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={12}>12</option>
        </select>
      </label>

      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div role="alert">Error: {error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {u.first_name} {u.last_name}
                </td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage(1)} disabled={page === 1}>
          First
        </button>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}
