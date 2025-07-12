import { Suspense } from "react";

import { AiAgentShowcase } from "@/components/features/website/ai-agent-showcase";
import { Features } from "@/components/features/website/features";
import { Hero } from "@/components/features/website/hero";
import { Pricing } from "@/components/features/website/pricing";
import { SubscriptionSuccess } from "@/components/features/website/subscription-success";
import { WhyUplevl } from "@/components/features/website/why-uplevl";

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
