import { AnalyticsIcon, BookingIcon, BotIcon, HoldPhoneIcon, LoyaltyCardIcon, SeoIcon } from "@/components/icons";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  return (
    <Section id="features">
      <SectionHeader>
        <SectionTitle>We Turn Your Business Growth Into a System, So You Don&apos;t Have To</SectionTitle>
        <SectionDescription>
          Uplevl brings together the tools small businesses need to grow: automated booking, AI-powered engagement, and
          effortless social content, all in one easy-to-use platform. There is no learning curve, just real results.
        </SectionDescription>
      </SectionHeader>
      <SectionContent className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center gap-4 sm:flex-col sm:items-start">
            <BotIcon className="size-12 sm:size-10" fill="var(--color-secondary)" />
            <CardTitle as="h3">AI-Powered Website Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            Your smart agent chats with visitors, answers questions, and books appointments, like a digital front desk
            that never sleeps.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4 sm:flex-col sm:items-start">
            <HoldPhoneIcon className="size-12 sm:size-10" />
            <CardTitle as="h3">Effortless Social Media Content</CardTitle>
          </CardHeader>
          <CardContent>
            Just snap a photo. Uplevl turns it into a ready-to-share social post—complete with caption, hashtags, and
            your brand voice.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4 sm:flex-col sm:items-start">
            <BookingIcon className="size-12 sm:size-10" />
            <CardTitle as="h3">Smart Booking & Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            Clients book in seconds. Uplevl sends friendly reminders and confirmations to keep your calendar full and
            predictable.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4 sm:flex-col sm:items-start">
            <SeoIcon className="size-12 sm:size-10" />
            <CardTitle as="h3">Built-In Local SEO Boost</CardTitle>
          </CardHeader>
          <CardContent>
            Your site is optimized from day one, helping you rank higher in local searches and attract more nearby
            customers.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4 sm:flex-col sm:items-start">
            <LoyaltyCardIcon className="size-12 sm:size-10" />
            <CardTitle as="h3">Automated Loyalty System</CardTitle>
          </CardHeader>
          <CardContent>
            Reward repeat visits with perks, no cards, no tracking. Uplevl remembers and thanks them for you.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4 sm:flex-col sm:items-start">
            <AnalyticsIcon className="size-12 sm:size-10" />
            <CardTitle as="h3">Insights & Control Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            Track bookings, engagement, and content performance. All from a simple dashboard designed for busy owners.
          </CardContent>
        </Card>
      </SectionContent>
    </Section>
  );
}
