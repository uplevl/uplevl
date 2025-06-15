import { useQuery } from "@tanstack/react-query";

import { api } from "@@/shared/lib/api";

export default function DashboardPage() {
  const { data, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.$get().then((res) => res.json()),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">DashboardPage</h1>
      {isPending && <div>Loading...</div>}
      {data && <div>{data.message}</div>}
    </div>
  );
}
