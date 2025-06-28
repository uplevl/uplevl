import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ClerkProvider } from "@/providers/clerk.provider";
import { PosthogIdentifyProvider } from "@/providers/posthog-identify.provider";

import { PHProvider } from "../providers/posthog.provider";
import "./styles.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Uplevl | Small Business Growth Engine",
    template: "%s - Uplevl | Small Business Growth Engine",
  },
  description:
    "Uplevl is the all-in-one AI-powered marketing system that helps small businesses book more clients, save hours on admin, and grow faster—without lifting a finger.",
  keywords:
    "AI marketing for small business, small business automation, local SEO software, AI assistant for businesses, AI chatbot for website, automated social media marketing, appointment booking software, small business growth tools, digital marketing automation, business growth engine, AI-powered customer engagement, smart website assistant, AI marketing platform, Uplevl, small business AI system",
  authors: [{ name: "Uplevl", url: "https://uplvl.ai" }],
  creator: "Uplevl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    url: "https://uplvl.ai",
    siteName: "Uplevl",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://uplvl.ai/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
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
    <ClerkProvider>
      <PHProvider>
        <PosthogIdentifyProvider />
        <html
          lang="en"
          className={`${geist.variable} ${geistMono.variable} bg-background antialiased`}
          suppressHydrationWarning
        >
          <body className="bg-background text-foreground flex min-h-screen min-w-screen flex-col font-sans">
            {children}
          </body>
        </html>
      </PHProvider>
    </ClerkProvider>
  );
}
