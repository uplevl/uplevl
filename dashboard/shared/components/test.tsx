import { useQuery } from "@tanstack/react-query";

export function Test() {
  const { data, isPending } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await fetch("/api");
      const data = await response.json();
      return data;
    },
  });

  if (isPending) return <div>Loading...</div>;

  if (!data) return <div>No data</div>;

  return <div>{data.message}</div>;
}
