import { redirect } from "next/navigation";

import { getAgent } from "@/api/actions/agent/queries";

import { AgentSettingsFormProvider } from "@/components/features/agent-settings/agent-settings-form-provider";
import { BusinessForm } from "@/components/features/agent-settings/business-form";
import { OfferingsForm } from "@/components/features/agent-settings/offerings-form";

export default async function PageContent() {
  const agent = await getAgent();

  if (!agent) {
    return redirect("/onboarding");
  }

  return (
    <AgentSettingsFormProvider agent={agent}>
      <div className="divide-y">
        <BusinessForm />
        <OfferingsForm agent={agent} />
      </div>
    </AgentSettingsFormProvider>
  );
}
