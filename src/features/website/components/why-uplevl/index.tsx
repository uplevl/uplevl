import {
  AiIcon,
  ContentIcon,
  GrowthIcon,
  InsightsIcon,
  IntegrationIcon,
  LoyaltyHeartIcon,
  SeoIcon,
  StopWatchIcon,
} from "@/components/icons";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
} from "@/components/section";

export function WhyUplevl() {
  return (
    <Section className="bg-linear-to-b from-stone-600 to-stone-700">
      <SectionHeader>
        <SectionEyebrow className="text-primary font-semibold">Why Uplevl?</SectionEyebrow>
        <SectionTitle className="text-white">
          All-in-one Growth Automation, Built for Real-World Businesses
        </SectionTitle>
        <SectionDescription className="text-neutral-300">
          Uplevl gives you the tools to attract, convert, and retain customers, without hiring a whole team or learning
          complicated software.
        </SectionDescription>
      </SectionHeader>
      <SectionContent className="grid gap-6 text-pretty sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <GrowthIcon color="var(--color-neutral-300)" />
            <span>Designed for Growth, Not Just Clicks</span>
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            Uplevl helps you drive real bookings, build client relationships, and scale your service business the smart
            way.
          </WhyUplevlDescription>
        </WhyUplevlItem>
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <AiIcon color="var(--color-neutral-300)" />
            <span>AI as a Real Team Member</span>
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            Your AI agent chats, books, follows up, and even upsells. Just like a helpful staff member, but available
            24/7.
          </WhyUplevlDescription>
        </WhyUplevlItem>
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <ContentIcon color="var(--color-neutral-300)" />
            <span>Content Creation Made Simple</span>
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            Upload a photo, add a few words, and you&apos;re done. Uplevl turns your moments into social media posts
            that look pro. No editing skills needed.
          </WhyUplevlDescription>
        </WhyUplevlItem>
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <StopWatchIcon color="var(--color-neutral-300)" />
            <span>Always-On Scheduling & Reminders</span>
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            Clients get automatic confirmations and reminders, so your calendar stays full and no-shows become a thing
            of the past.
          </WhyUplevlDescription>
        </WhyUplevlItem>
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <SeoIcon color="var(--color-neutral-300)" />
            Built-In SEO That Actually Works
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            We take care of technical SEO and local search ranking, so your business shows up when customers are ready
            to book.
          </WhyUplevlDescription>
        </WhyUplevlItem>
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <LoyaltyHeartIcon color="var(--color-neutral-300)" />
            Loyalty That Runs Itself
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            Clients come back when they feel valued. Uplevl tracks visits and rewards repeat customers automatically—no
            punch cards needed.
          </WhyUplevlDescription>
        </WhyUplevlItem>
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <InsightsIcon color="var(--color-neutral-300)" />
            Insight-Driven Simplicity
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            See what&apos;s working and what needs a tweak, all from a dashboard made for busy business owners, not data
            scientists.
          </WhyUplevlDescription>
        </WhyUplevlItem>
        <WhyUplevlItem>
          <WhyUplevlHeading>
            <IntegrationIcon color="var(--color-neutral-300)" />
            Seamlessly Integrated
          </WhyUplevlHeading>
          <WhyUplevlDescription>
            From your website to your inbox to your socials—Uplevl ties it all together without extra logins, vendors,
            or tools to manage.
          </WhyUplevlDescription>
        </WhyUplevlItem>
      </SectionContent>
    </Section>
  );
}

function WhyUplevlItem({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 space-y-2 sm:mb-6 sm:space-y-4">{children}</div>;
}

function WhyUplevlHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="flex items-end gap-2 text-lg leading-none font-bold tracking-tight text-white">{children}</h3>;
}

function WhyUplevlDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-neutral-300">{children}</p>;
}
