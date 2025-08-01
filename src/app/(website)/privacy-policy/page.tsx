import { type Metadata } from "next";

import { MailLink } from "@/components/mail-link";
import { Page, PageHeader } from "@/components/page";
import { Heading, List } from "@/components/typography";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Uplevl protects your personal data and respects your privacy rights.",
};

export default function PrivacyPolicy() {
  return (
    <Page simple>
      <PageHeader simple title="Uplevl Privacy Policy">
        <p className="text-muted-foreground mt-1 text-xs">Last updated: May 9, 2025</p>
      </PageHeader>
      <div className="space-y-3 leading-relaxed">
        <p>
          Welcome to Uplevl (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a platform developed by DevBucket LLC
          to help small businesses automate marketing and grow through AI-powered tools. This Privacy Policy describes
          how we collect, use, share, and safeguard your personal information when you access or use our services
          through our website (uplevl.ai), mobile apps, and any related services (collectively, the
          &quot;Services&quot;). By using our Services, you agree to the practices outlined in this Privacy Policy.
        </p>
        <Heading>1. Scope</Heading>
        <p>
          This Privacy Policy applies to all users of Uplevl&apos;s Services, including customers, website visitors, and
          any individuals interacting with our platform. It covers information we collect directly, automatically, or
          through third-party services in relation to the use of Uplevl. This policy does not apply to customer-specific
          data submitted by end-users to businesses that use Uplevl; those businesses are responsible for their own
          privacy practices.
        </p>
        <Heading>2. Information We Collect</Heading>
        <Heading as="h3" small>
          2.1. Information You Provide
        </Heading>
        <List>
          <li>
            <strong>Account Information.</strong> When you create an account, we collect your name, business name, email
            address, and other details you provide.
          </li>
          <li>
            <strong>Payment Information.</strong> For paid tiers, we collect billing and payment data through
            third-party services like Stripe. We do not store full credit card numbers ourselves.
          </li>
          <li>
            <strong>Uploaded Content.</strong> We collect and store the images, captions, and other media you upload
            through the platform for use with AI-powered marketing tools.
          </li>
          <li>
            <strong>Communications.</strong> We store correspondence sent to our support channels or through the
            platform.
          </li>
        </List>
        <Heading as="h3" small>
          2.2 Automatically Collected Information
        </Heading>
        <List>
          <li>
            <strong>Device & Usage Data.</strong> We collect your IP address, browser type, OS, pages visited,
            timestamps, clickstream data, and performance metrics for analytics and diagnostics.
          </li>
          <li>
            <strong>Cookies and Similar Technologies.</strong> We use session and persistent cookies to improve
            functionality, store preferences, and gather analytics data.
          </li>
        </List>
        <Heading>3. How We Use Your Information</Heading>
        <p>We use your information to:</p>
        <List>
          <li>Provide, maintain, and improve our Services</li>
          <li>Deliver features like the AI booking agent, image-to-post automation, and social content scheduling</li>
          <li>Manage accounts, process payments, and provide customer support</li>
          <li>Monitor platform usage for fraud prevention and diagnostics</li>
          <li>Send important service notifications and occasional marketing emails (opt-out available)</li>
          <li>Comply with legal obligations and enforce terms of service</li>
        </List>
        <Heading>4. Sharing and Disclosure of Information</Heading>
        <p>
          We do <strong>not</strong> sell your personal data. We may share data under the following circumstances:
        </p>
        <List>
          <li>
            <strong>Service Providers.</strong> With third-party vendors (e.g., hosting providers, payment processors,
            analytics tools) that support our operations
          </li>
          <li>
            <strong>Legal Requirements.</strong> When compelled by law or to protect legal rights, investigate
            violations, or address fraud
          </li>
          <li>
            <strong>Business Transfers.</strong> In connection with mergers, sales, or acquisitions
          </li>
          <li>
            <strong>With Your Consent. </strong> When you explicitly agree to share specific data (e.g., public
            testimonials)
          </li>
        </List>
        <Heading>5. Data Storage and Retention</Heading>
        <p>
          Your data is securely stored on servers hosted by trusted providers. We retain personal data for as long as
          your account is active or as needed to provide Services, comply with legal obligations, resolve disputes, and
          enforce agreements. Uploaded content used for social posts may be deleted at your request or upon account
          termination.
        </p>
        <Heading>6. Data Security</Heading>
        <p>We implement modern security practices to protect your data, including:</p>
        <List>
          <li>Encrypted data transmission (HTTPS)</li>
          <li>Role-based access control for internal systems</li>
          <li>Regular vulnerability checks and updates</li>
        </List>
        <p>
          Despite our best efforts, no method of storage or transmission over the internet is 100% secure. You are
          responsible for safeguarding your account credentials.
        </p>
        <Heading>7. International Data Transfers</Heading>
        <p>
          Uplevl operates from the United States. By using our Services, you agree that your data may be transferred and
          stored in the U.S. or other countries where our service providers operate. We take steps to ensure such
          transfers comply with applicable data protection laws.
        </p>
        <Heading>8. Your Rights</Heading>
        <p>Depending on your location, you may have rights under applicable privacy laws, including:</p>
        <List>
          <li>Accessing or correcting personal information</li>
          <li>Requesting data deletion</li>
          <li>Objecting to data processing or marketing communications</li>
          <li>Exporting your data in a portable format</li>
        </List>
        <p>You can manage your preferences through your account settings or contact us for assistance.</p>
        <Heading>9. Children&apos;s Privacy</Heading>
        <p>
          Our Services are not intended for users under the age of 18. We do not knowingly collect personal information
          from children. If you believe a child has provided us with personal data, please contact us to have it
          removed.
        </p>
        <Heading>10. Changes to This Policy</Heading>
        <p>
          We may revise this Privacy Policy from time to time. When we make material changes, we will notify users by
          updating the date above, and potentially via email or platform alerts. Continued use of the Service after such
          updates constitutes your acceptance.
        </p>
        <Heading>11. Contact Us</Heading>
        <p>If you have any questions about this Privacy Policy or our data practices, please reach out to:</p>
        <p>
          Uplevl
          <br />
          5900 Balcones Drive, Suite 100
          <br />
          Austin, TX 78731
          <br />
          <MailLink email="support@uplevl.ai" />
        </p>
      </div>
    </Page>
  );
}
