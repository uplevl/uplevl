import { Suspense } from "react";

import { Benefits } from "@/components/features/website/benefits";
import { DripCampaignFeature } from "@/components/features/website/drip-campaign-feature";
import { FinalCTA } from "@/components/features/website/final-cta";
import { Hero } from "@/components/features/website/hero";
import { MobileUploader } from "@/components/features/website/mobile-uploader";
import { ProblemStatement } from "@/components/features/website/problem-statement";
// import { SocialProof } from "@/components/features/website/social-proof";
import { SolutionStatement } from "@/components/features/website/solution-statement";
import { SubscriptionSuccess } from "@/components/features/website/subscription-success";
import { VisualProcess } from "@/components/features/website/visual-process";

export default function WebsiteHome() {
  return (
    <main className="flex-1">
      <Hero />
      <ProblemStatement />
      <SolutionStatement />
      <VisualProcess />
      <MobileUploader />
      <DripCampaignFeature />
      <Benefits />
      {/* <SocialProof /> */}
      <FinalCTA />
      {/* <AiAgentShowcase />
      <Features />
      <WhyUplevl /> */}
      {/* <Pricing /> */}
      <Suspense fallback={null}>
        <SubscriptionSuccess />
      </Suspense>
    </main>
  );
}
