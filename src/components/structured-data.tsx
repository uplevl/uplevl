import { type Organization, type SoftwareApplication, type WebSite, type WithContext } from "schema-dts";

interface StructuredDataProps {
  data: WithContext<Organization | WebSite | SoftwareApplication> | Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Organization structured data for Uplevl
export const organizationStructuredData: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uplevl",
  url: "https://uplevl.ai",
  logo: "https://uplevl.ai/logo.svg",
  description:
    "Automated marketing system designed for real estate agents to generate leads and automate client follow-ups.",
  foundingDate: "2024",
  sameAs: ["https://twitter.com/uplevl", "https://linkedin.com/company/uplevl"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://uplevl.ai/contact",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
};

// Website structured data
export const websiteStructuredData: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uplevl",
  url: "https://uplevl.ai",
  description: "Automated marketing system for real estate agents",
  publisher: {
    "@type": "Organization",
    name: "Uplevl",
    url: "https://uplevl.ai",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://uplevl.ai/search?q={search_term_string}",
    },
  },
};

// Software Application structured data
export const softwareApplicationStructuredData: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Uplevl",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  url: "https://uplevl.ai",
  description:
    "All-in-one marketing automation system for real estate agents. Generate leads, automate follow-ups, and manage social media content.",
  softwareVersion: "1.0",
  datePublished: "2024-01-01",
  publisher: {
    "@type": "Organization",
    name: "Uplevl",
    url: "https://uplevl.ai",
  },
  offers: {
    "@type": "Offer",
    category: "SaaS",
    priceCurrency: "USD",
    price: "97",
    priceValidUntil: "2025-12-31",
    availability: "https://schema.org/InStock",
    url: "https://uplevl.ai/pricing",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "AI-powered content generation",
    "Automated social media posting",
    "Lead generation automation",
    "Client follow-up automation",
    "Property showcase automation",
    "Analytics and reporting",
  ],
};
