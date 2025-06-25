import { Suspense } from "react";

import { AiAgentShowcase } from "@/features/website/components/ai-agent-showcase";
import { Features } from "@/features/website/components/features";
import { Hero } from "@/features/website/components/hero";
import { Pricing } from "@/features/website/components/pricing";
import { SubscriptionSuccess } from "@/features/website/components/subscription-success";
import { WhyUplevl } from "@/features/website/components/why-uplevl";

export default function WebsiteHome() {
  return (
    <main className="flex-1">
      <Hero />
      <AiAgentShowcase />
      <Features />
      <WhyUplevl />
      <Pricing />
      <Suspense fallback={null}>
        <SubscriptionSuccess />
      </Suspense>
    </main>
  );
}
