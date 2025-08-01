import { redirect } from "next/navigation";

import { getAgent } from "@/features/agent-settings/api/queries";
import { AgentSettingsFormProvider } from "@/features/agent-settings/components/agent-settings-form-provider";
import { BusinessForm } from "@/features/agent-settings/components/business-form";
import { OfferingsForm } from "@/features/offerings/components/offerings-form";

export async function PageContent() {
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
