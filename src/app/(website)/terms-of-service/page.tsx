import { type Metadata } from "next";

import { Page, PageHeader } from "@/components/common/page";
import { MailLink } from "@/components/mail-link";
import { Heading, List } from "@/components/typography";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read Uplevl's Terms of Service to understand how we operate and what you agree to by using our platform.",
};

export default function TermsOfService() {
  return (
    <Page simple>
      <PageHeader simple title="Uplevl Terms of Service">
        <p className="text-muted-foreground mt-1 text-xs">Last updated: May 9, 2025</p>
      </PageHeader>
      <div className="space-y-3 leading-relaxed">
        <p>
          Welcome to Uplevl! These Terms of Service (&quot;Terms&quot;) are entered into by and between you and
          DevBucket LCC d/b/a Uplevl, (&quot;Uplevl&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and
          govern your access to and use of the Uplevl website, mobile application, and SaaS platform (collectively, the
          &quot;Service&quot;). By accessing or using the Service, you agree to comply with and be bound by these Terms.
        </p>
        <Heading>1. Eligibility</Heading>
        <p>
          You must be at least 18 years old to use the Service. By using Uplevl, you affirm that you meet this
          requirement.
        </p>
        <Heading>2. Description of Service</Heading>
        <p>
          Uplevl is a fully managed SaaS platform designed to help small businesses grow through AI-powered appointment
          scheduling, social media content generation, and local SEO automation. We offer tools for:
        </p>
        <List>
          <li>Smart AI assistant integrations</li>
          <li>Image and content upload via a mobile app</li>
          <li>Automated social media post generation</li>
          <li>Local SEO visibility enhancement</li>
          <li>Admin dashboard access for managing your business profile</li>
        </List>
        <p>
          These tools may evolve over time and may include additional features, upgrades, or changes. Uplevl reserves
          the right to modify or discontinue any aspect of its services at any time with or without prior notice.
        </p>
        <Heading>3. User Accounts and Access</Heading>
        <p>
          To use Uplevl, you must create an account and provide accurate, current, and complete information. You are
          responsible for maintaining the confidentiality of your login credentials and are fully responsible for all
          activities that occur under your account. If you suspect any unauthorized use of your account, you must notify
          us immediately at <MailLink email="support@uplevl.ai" />.
        </p>
        <Heading>4. User Content and License</Heading>
        <p>
          By uploading content, including images, text, or business data, to the Uplevl platform, you retain ownership
          of your content but grant Uplevl a non-exclusive, royalty-free, worldwide license to use, host, store,
          reproduce, modify, and display such content solely for the purpose of operating and improving the service.
        </p>
        <p>
          Uplevl does not publicly display your content unless you explicitly grant permission. We may use anonymized,
          aggregated data derived from your usage to improve our services and develop new features.
        </p>
        <Heading>5. Payments and Billing</Heading>
        <p>
          Uplevl operates on a subscription model. Your chosen plan and associated fees will be presented during the
          signup process. By subscribing, you authorize us to charge your payment method on a recurring basis.
        </p>
        <p>
          Subscriptions renew automatically unless canceled prior to the next billing cycle. You may cancel your
          subscription at any time through your account settings. Fees are non-refundable except where required by law.
          Uplevl reserves the right to change pricing with reasonable prior notice.
        </p>
        <Heading>6. Acceptable Use Policy</Heading>
        <p>
          You agree not to use Uplevl for any unlawful, harmful, fraudulent, infringing, or otherwise objectionable
          purpose. You must not attempt to gain unauthorized access to the platform, use automated systems to access our
          services, interfere with the operation of our systems, or violate applicable intellectual property laws.
        </p>
        <p>
          Uploading or transmitting content that is illegal, harmful, threatening, abusive, defamatory, or objectionable
          in any way is strictly prohibited. We reserve the right to remove such content and suspend or terminate
          accounts at our discretion.
        </p>
        <Heading>7. Service Availability</Heading>
        <p>
          Uplevl is designed to operate reliably and with high availability, but we do not guarantee uninterrupted or
          error-free access to the service. We may perform maintenance, updates, or changes that temporarily affect
          service availability. Uplevl is not liable for any loss resulting from service interruptions.
        </p>
        <Heading>8. Intellectual Property</Heading>
        <p>
          All rights, title, and interest in and to the Uplevl platform, including its software, content, branding, and
          technology, are owned by DevBucket LLC or its licensors. You may not copy, modify, distribute, sell, or lease
          any part of our platform or reverse-engineer any of our software.
        </p>
        <Heading>9. Termination</Heading>
        <p>
          We reserve the right to suspend or terminate your account and access to the service at any time for any
          violation of these Terms. Upon termination, your access will be revoked, and your content may be deleted from
          our systems unless otherwise required by law.
        </p>
        <p>
          You may cancel your account at any time through your dashboard. Upon cancellation, your subscription will not
          renew, but you will retain access to your account until the end of the billing period.
        </p>
        <Heading>10. Limitation of Liability</Heading>
        <p>
          To the maximum extent permitted by applicable law, Uplevl shall not be liable for any indirect, incidental,
          special, or consequential damages arising from your use of the platform, including but not limited to loss of
          profits, data, or business opportunities. Our total liability shall not exceed the amount paid by you for the
          service in the 12 months preceding the claim.
        </p>
        <Heading>11. Disclaimers</Heading>
        <p>
          Uplevl is provided &quot;as is&quot; without warranties of any kind, either express or implied, including but
          not limited to merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee
          that the service will meet your specific requirements or achieve any specific results.
        </p>
        <Heading>12. Changes to Terms</Heading>
        <p>
          We may update these Terms at any time. Changes will be communicated via email or through the Uplevl dashboard.
          Continued use of the service after changes are posted constitutes acceptance of the updated Terms.
        </p>
        <Heading>13. Privacy Policy</Heading>
        <p>
          Use of Uplevl is subject to our Privacy Policy, which explains how we collect, use, and protect your data. You
          can review our Privacy Policy at uplevl.ai/privacy.
        </p>
        <Heading>14. Governing Law</Heading>
        <p>
          These Terms are governed by and construed in accordance with the laws of the State of Texas, without regard to
          conflict of laws principles. Any disputes arising from these Terms or your use of Uplevl shall be resolved in
          the state or federal courts located in Austin, Texas.
        </p>
        <Heading>15. Contact</Heading>
        <p>If you have questions about these Terms, please contact us at:</p>
        <p>
          Uplevl
          <br />
          5900 Balcones Drive, Suite 100
          <br />
          Austin, TX 78731
          <br />
          <MailLink email="support@uplevl.ai" />
        </p>
        <p>
          These Terms constitute the entire agreement between you and Uplevl and supersede all prior or contemporaneous
          agreements, whether written or oral, relating to the subject matter hereof.
        </p>
      </div>
    </Page>
  );
}
