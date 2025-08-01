import { PersonalEmailTemplate } from "@/features/emails/components/email-templates";

interface WelcomeEmailProps {
  firstName: string;
}

export function WelcomeEmailOne({ firstName }: WelcomeEmailProps) {
  return (
    <PersonalEmailTemplate>
      Hi {firstName},<br />
      <br />
      Thanks for signing up. You&apos;re now on the waitlist for Uplevl.
      <br />
      <br />
      If you&apos;re like most agents I&apos;ve spoken to, social media probably feels more like a chore than a growth
      channel. I built Uplevl to change that, one post at a time.
      <br />
      <br />
      I&apos;ll share a bit more about what I&apos;ve learned (and why I&apos;m building this) over the next few days.
      No fluff, no hype, just honest thoughts.
      <br />
      <br />
      Talk soon,
    </PersonalEmailTemplate>
  );
}

export function WelcomeEmailTwo({ firstName }: WelcomeEmailProps) {
  return (
    <PersonalEmailTemplate>
      Hey {firstName},<br />
      <br />
      Most of the agents I talk to feel the same way:
      <br />
      - They want to post consistently.
      <br />
      - They try to stay visible online.
      <br />
      But between showings, contracts, and life ... it never sticks.
      <br />
      <br />
      And the problem is, the bar keeps moving. You&apos;re competing with professional content creators, not just other
      agents.
      <br />
      <br />
      That&apos;s not fair. And it&apos;s not sustainable.
      <br />
      <br />
      That&apos;s why I&apos;m building Uplevl. Not to make you go viral, but to make posting feel doable again.
      <br />
      <br />
      I am curious to hear what you think.
      <br />
      I read and reply to every email, so reply to this one and let me know what you think.
      <br />
      <br />
      Cheers,
    </PersonalEmailTemplate>
  );
}

export function WelcomeEmailThree({ firstName }: WelcomeEmailProps) {
  return (
    <PersonalEmailTemplate>
      Hi {firstName},<br />
      <br />
      I&apos;m not a marketer. I&apos;ve spent the last 25 years as a frontend engineer, quietly building things behind
      the scenes.
      <br />
      <br />
      Social media never came naturally to me. I avoided it for most of my career.
      <br />
      <br />
      But when I started working with small business owners and customer facing professionals like you, I saw the same
      pattern again and again:
      <br />
      Brilliant at their craft. Drowning when it came to marketing.
      <br />
      <br />
      I couldn&apos;t shake that. So I built Uplevl.
      <br />
      <br />
      It&apos;s still early. But I believe it can give solo professionals the kind of help they actually need, without
      becoming influencers.
      <br />
      <br />
      What is your biggest pain point when it comes to marketing?
      <br />
      Hit &quot;Reply&quot; and let me know. I read and reply to every email.
      <br />
      <br />
      Cheers,
    </PersonalEmailTemplate>
  );
}
