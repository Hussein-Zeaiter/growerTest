import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Tan() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: ({ ...a }) => {
      //the a here is QueryFunctionContext which is an object passed to every query fct, pretty cool has a lot of things that you can use and will use
      console.log(a);
      return axios
        .get("https://api.github.com/repos/TanStack/query")
        .then((res) => res.data);
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
