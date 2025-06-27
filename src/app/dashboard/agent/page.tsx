import { RedirectToSignIn } from "@clerk/nextjs";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { Page, PageHeader } from "@/components/page";
import { Separator } from "@/components/ui/separator";

import { getAgentByClerkId } from "@/features/agent/actions/agent";
import { BusinessForm } from "@/features/agent/components/business-form";
import { OfferingsForm } from "@/features/agent/components/offerings-form";
import { AgentFormProvider } from "@/features/agent/providers/agent-form-provider";
import { AgentProvider } from "@/features/agent/providers/agent-provider";
import { getCurrentUser } from "@/features/auth/actions/user";

export const metadata: Metadata = {
  title: "Agent Settings",
  description: "Configure your agent to best serve your business.",
};

export default async function AgentPage() {
  const { userId } = await getCurrentUser();
  if (!userId) return <RedirectToSignIn />;

  const agent = await getAgentByClerkId(userId);
  if (!agent) return redirect("/onboarding");

  return (
    <AgentProvider agent={agent}>
      <AgentFormProvider>
        <Page>
          <PageHeader title="Agent Settings" description="Configure your agent to best serve your business." />
          <div className="space-y-6">
            <BusinessForm />
            <Separator />
            <OfferingsForm />
          </div>
        </Page>
      </AgentFormProvider>
    </AgentProvider>
  );
}
