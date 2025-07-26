import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/styles/styles.css";

import Providers from "@/providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Uplevl | Automated Marketing System for Real Estate Agents",
    template: "%s - Uplevl | Real Estate Marketing Automation",
  },
  description:
    "Uplevl is the all-in-one marketing system designed for real estate agents. Generate more leads, automate client follow-ups, showcase properties on social media, and close more deals—all while saving hours each week.",
  keywords:
    "real estate marketing automation, real estate lead generation, automated marketing for realtors, property marketing automation, real estate social media automation, realtor CRM automation, automated client follow-up, property listing automation, real estate client management, automated follow-up system for realtors, real estate agent tools, marketing automation for real estate, property showcase automation, real estate business growth, realtor productivity tools, automated real estate content, marketing assistant for realtors, lead nurturing for realtors, real estate marketing system, Uplevl real estate",
  authors: [{ name: "Uplevl", url: "https://uplvl.ai" }],
  creator: "Uplevl",
  category: "Real Estate Technology",
  classification: "Business Software",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://uplvl.ai",
  },
  openGraph: {
    url: "https://uplvl.ai",
    siteName: "Uplevl",
    locale: "en_US",
    type: "website",
    title: "Uplevl | Automated Marketing System for Real Estate Agents",
    description:
      "Generate more real estate leads and close more deals with marketing automation designed specifically for realtors.",
    images: [
      {
        url: "https://uplvl.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uplevl - Automated Marketing System for Real Estate Agents",
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
    images: ["https://uplvl.ai/og-image.png"],
  },
  appLinks: {
    web: {
      url: "https://uplvl.ai",
      should_fallback: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} bg-background antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-screen min-w-screen flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
