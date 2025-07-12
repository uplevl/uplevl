import { Section, SectionDescription, SectionHeader, SectionTitle } from "@/components/common/section";
import { Feature } from "@/components/features/subscriptions/feature";
import { SubscribeButton } from "@/components/features/subscriptions/subscribe-button";
import {
  AccessIcon,
  AiIcon,
  AiOptimizedIcon,
  AnalyticsIconDuoTone,
  BrushIcon,
  ChampionIcon,
  DirectSupportIcon,
  DoubleCheckIcon,
  SeoIconOutlined,
  SmartPhoneIcon,
  StopWatchIcon,
} from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader>
        <SectionTitle>Pricing</SectionTitle>
        <SectionDescription>
          Uplevl keeps things simple: one powerful plan with everything included. Join before launch to lock in lifetime
          access at our best price. After that, rates go up.
        </SectionDescription>
      </SectionHeader>
      <Card className="sm:mx-auto sm:max-w-sm">
        <CardHeader>
          <CardTitle as="h3">Founding Member</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="leading-normal">
            <p className="gap-2 space-x-1">
              <span className="mr-2 text-2xl tracking-tight text-neutral-500">
                <span className="line-through">$399</span>
              </span>
              <span className="text-4xl font-bold tracking-tight">$49</span>
              <span className="text-sm">per month</span>
            </p>
            <p className="text-xs text-neutral-500">Available until end of June 2025</p>
          </div>
          <ul className="space-y-3 sm:mb-6">
            <Feature
              feature={{
                type: "listing",
                key: "done-for-you-onboarding",
                label: "Done-for-you onboarding — we set it all up",
                icon: <DoubleCheckIcon />,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "ai-assistant-for-bookings-inquiries",
                label: "AI assistant for bookings & inquiries",
                icon: <AiIcon />,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "24-7-automation-to-capture-leads",
                label: "24/7 automation to capture leads",
                icon: <StopWatchIcon />,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "local-seo-setup-optimization",
                label: "Local SEO setup & optimization",
                icon: <SeoIconOutlined />,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "mobile-uploader-app-for-service-photos",
                label: "Mobile uploader app for service photos",
                icon: <SmartPhoneIcon />,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "ai-optimized-social-media-posts",
                label: "AI-optimized social media posts",
                icon: <AiOptimizedIcon />,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "branded-post-templates",
                label: "Branded post templates",
                icon: <BrushIcon />,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "performance-analytics-dashboard",
                label: "Performance analytics dashboard",
                icon: <AnalyticsIconDuoTone />,
              }}
            />
            <Feature feature={{ type: "separator", key: "separator-1" }} />
            <Feature
              feature={{
                type: "listing",
                key: "founder-support-check-ins",
                label: "+ Founder support & check-ins",
                icon: <DirectSupportIcon />,
                special: true,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "lifetime-access",
                label: "+ Lifetime access",
                icon: <AccessIcon />,
                special: true,
              }}
            />
            <Feature
              feature={{
                type: "listing",
                key: "early-adopter-perks",
                label: "+ Early adopter perks",
                icon: <ChampionIcon />,
                special: true,
              }}
            />
          </ul>
          <div className="flex flex-col gap-2">
            <SubscribeButton priceTag="FOUNDING_MEMBER" label="Become a Founding Member" />
            <p className="text-center text-xs text-neutral-500">Cancel anytime. No contracts, no commitments.</p>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
