import { Page, PageHeader } from "@/components/page";
import { PageLoading } from "@/components/page-loading";

export default function AgentLoadingPage() {
  return (
    <Page>
      <PageHeader title="Agent Settings" description="Configure your agent to best serve your business." />
      <PageLoading />
    </Page>
  );
}
