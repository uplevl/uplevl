import { type Metadata } from "next";
import { Suspense } from "react";

import { Page, PageHeader } from "@/components/page";
import { PageLoading } from "@/components/page-loading";

import { PageContent } from "./page-content";

export const metadata: Metadata = {
  title: "Agent Settings",
  description: "Configure your agent to best serve your business.",
};

export default function AgentSettingsPage() {
  return (
    <Page>
      <PageHeader title="Agent Settings" description="Configure your agent to best serve your business." />
      <Suspense fallback={<PageLoading />}>
        <PageContent />
      </Suspense>
    </Page>
  );
}
