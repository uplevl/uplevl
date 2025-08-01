import { type Metadata } from "next";
import { Suspense } from "react";

import { FormPanel } from "@/components/form-panel";
import { Page, PageHeader } from "@/components/page";
import { PageLoading } from "@/components/page-loading";

import { PageContent } from "./page-content";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Here you handle your social media connections.",
};

export default function IntegrationsPage() {
  return (
    <Page>
      <PageHeader title="Integrations" description="Here you handle your social media connections." />
      <FormPanel
        title="Social Media Accounts"
        description="Connect the social media accounts you want to use with your AI agent. This will give Uplevl access to you account to post and interact with your audience."
      >
        <Suspense fallback={<PageLoading />}>
          <PageContent />
        </Suspense>
      </FormPanel>
    </Page>
  );
}
