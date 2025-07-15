import { type Metadata } from "next";
import { Suspense } from "react";

import { getAgent } from "@/data/agent/queries";

import { Page, PageHeader } from "@/components/common/page";
import { PageLoading } from "@/components/common/page-loading";
import { AgentSettingsFormProvider } from "@/components/features/agent-settings/agent-settings-form-provider";
import { BusinessForm } from "@/components/features/agent-settings/business-form";
import { OfferingsForm } from "@/components/features/agent-settings/offerings-form";

export const metadata: Metadata = {
  title: "Agent Settings",
  description: "Configure your agent to best serve your business.",
};

export default function AgentSettingsPage() {
  return (
    <Page>
      <PageHeader title="Agent Settings" description="Configure your agent to best serve your business." />
      <Suspense fallback={<PageLoading />}>
        <AgentSettingsContent />
      </Suspense>
    </Page>
  );
}

async function AgentSettingsContent() {
  const agent = await getAgent();

  return (
    <AgentSettingsFormProvider agent={agent}>
      <div className="divide-y">
        <BusinessForm />
        <OfferingsForm agent={agent} />
      </div>
    </AgentSettingsFormProvider>
  );
}
