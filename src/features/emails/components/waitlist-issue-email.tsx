import { PersonalEmailTemplate } from "@/features/emails/components/email-templates";

interface WaitlistIssueEmailProps {
  firstName: string;
}

export function WaitlistIssueEmail({ firstName }: WaitlistIssueEmailProps) {
  return (
    <PersonalEmailTemplate>
      Hi {firstName},<br />
      <br />
      I am sorry to hear that you are having issues with the waitlist.
      <br />
      I will check the logs and get back to you as soon as possible.
      <br />
      <br />
      In the meantime, please feel free to reach out to me via email, if you have any questions or feedback.
      <br />
      Just reply to this email and I will be in touch.
      <br />
      <br />
      Best,
    </PersonalEmailTemplate>
  );
}
