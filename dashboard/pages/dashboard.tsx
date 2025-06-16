import { useQuery } from "@tanstack/react-query";

import { Page, PageHeader } from "@@/shared/components/page";
import { api } from "@@/shared/lib/api";

export default function DashboardPage() {
  const { data, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.$get().then((res) => res.json()),
  });

  return (
    <Page>
      <PageHeader title="Dashboard" />
      {isPending && <div>Loading...</div>}
      {data && <div>{data.message}</div>}
    </Page>
  );
}
