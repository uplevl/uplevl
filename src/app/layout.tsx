import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./styles.css";

import { Providers } from "@/providers/providers";

import { PixelTracker } from "@/components/pixel-tracker";
import {
  StructuredData,
  organizationStructuredData,
  softwareApplicationStructuredData,
  websiteStructuredData,
} from "@/components/structured-data";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://uplevl.ai"),
  title: {
    default: "Uplevl | Automated Marketing System for Real Estate Agents",
    template: "%s - Uplevl | Real Estate Marketing Automation",
  },
  description:
    "Uplevl is the all-in-one marketing system designed for real estate agents. Generate more leads, automate client follow-ups, showcase properties on social media, and close more deals—all while saving hours each week.",
  keywords: [
    "real estate marketing automation",
    "real estate lead generation",
    "automated marketing for realtors",
    "property marketing automation",
    "real estate social media automation",
    "realtor CRM automation",
    "automated client follow-up",
    "property listing automation",
    "real estate client management",
    "automated follow-up system for realtors",
    "real estate agent tools",
    "marketing automation for real estate",
    "property showcase automation",
    "real estate business growth",
    "realtor productivity tools",
    "automated real estate content",
    "marketing assistant for realtors",
    "lead nurturing for realtors",
    "real estate marketing system",
    "Uplevl real estate",
  ],
  authors: [{ name: "Uplevl", url: "https://uplevl.ai" }],
  creator: "Uplevl",
  publisher: "Uplevl",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Real Estate Technology",
  classification: "Business Software",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION,
      }),
    },
  },
  alternates: {
    canonical: "https://uplevl.ai",
    languages: {
      "en-US": "https://uplevl.ai",
    },
  },
  openGraph: {
    url: "https://uplevl.ai",
    siteName: "Uplevl",
    locale: "en_US",
    type: "website",
    title: "Uplevl | Automated Marketing System for Real Estate Agents",
    description:
      "Generate more real estate leads and close more deals with marketing automation designed specifically for realtors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uplevl - Automated Marketing System for Real Estate Agents",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@uplevl",
    creator: "@uplevl",
    title: "Uplevl | Automated Marketing System for Real Estate Agents",
    description:
      "Generate more real estate leads and close more deals with marketing automation designed specifically for realtors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uplevl - Automated Marketing System for Real Estate Agents",
      },
    ],
  },
  appLinks: {
    web: {
      url: "https://uplevl.ai",
      should_fallback: true,
    },
  },
  applicationName: "Uplevl",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Uplevl",
    "application-name": "Uplevl",
    "msapplication-TileColor": "#f7f7f7",
    "theme-color": "#f7f7f7",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} bg-background antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-screen min-w-screen flex-col font-sans">
        <StructuredData data={organizationStructuredData} />
        <StructuredData data={websiteStructuredData} />
        <StructuredData data={softwareApplicationStructuredData} />
        <PixelTracker />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
