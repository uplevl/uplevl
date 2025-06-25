import { type Metadata } from "next";

import { Page, PageHeader } from "@/components/page";
import { Separator } from "@/components/ui/separator";

import { BusinessForm } from "@/features/agent/components/business-form";
import OfferingsForm from "@/features/agent/components/offerings-form";
import AgentFormProvider from "@/features/agent/providers/agent-form-provider";

export const metadata: Metadata = {
  title: "Agent Settings",
  description: "Configure your agent to best serve your business.",
};

export default function AgentPage() {
  return (
    <Page>
      <PageHeader title="Agent Settings" description="Configure your agent to best serve your business." />
      <AgentFormProvider>
        <div className="space-y-6">
          <BusinessForm />
          <Separator />
          <OfferingsForm />
        </div>
      </AgentFormProvider>
    </Page>
  );
}
