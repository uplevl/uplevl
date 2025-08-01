import { Suspense } from "react";

// import { Benefits } from "@/components/features/website/benefits";
import { DripCampaignFeature } from "@/features/website/components/drip-campaign-feature";
import { FinalCTA } from "@/features/website/components/final-cta";
import { Hero } from "@/features/website/components/hero";
import { MobileUploader } from "@/features/website/components/mobile-uploader";
import { ProblemStatement } from "@/features/website/components/problem-statement";
// import { SocialProof } from "@/components/features/website/social-proof";
import { SolutionStatement } from "@/features/website/components/solution-statement";
import { SubscriptionSuccess } from "@/features/website/components/subscription-success";
import { VisualProcess } from "@/features/website/components/visual-process";

export default function WebsiteHome() {
  return (
    <main className="flex-1">
      <Hero />
      <ProblemStatement />
      <SolutionStatement />
      <VisualProcess />
      <MobileUploader />
      <DripCampaignFeature />
      {/* <Benefits /> */}
      {/* <SocialProof /> */}
      <FinalCTA />
      {/* <Features /> */}
      {/* <Pricing /> */}
      <Suspense fallback={null}>
        <SubscriptionSuccess />
      </Suspense>
    </main>
  );
}
