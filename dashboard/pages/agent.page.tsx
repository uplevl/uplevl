import { Page, PageHeader } from "@@/components/page";
import { BusinessForm } from "@@/features/agent/components/business-form";
import { AgentFormsProvider } from "@@/features/agent/providers/agent-forms.provider";

export default function AgentPage() {
  return (
    <Page htmlTitle="Agent Settings">
      <PageHeader title="Agent Settings" />
      <div className="space-y-4">
        <AgentFormsProvider>
          <BusinessForm />
        </AgentFormsProvider>
      </div>
    </Page>
  );
}
