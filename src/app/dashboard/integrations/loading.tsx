import { FormPanel } from "@/components/form-panel";
import { Page, PageHeader } from "@/components/page";
import { PageLoading } from "@/components/page-loading";

export default function InteractionsLoading() {
  return (
    <Page>
      <PageHeader title="Integrations" description="Here you handle your social media connections." />
      <FormPanel
        title="Social Media Accounts"
        description="Connect the social media accounts you want to use with your AI agent. This will give Uplevl access to you account to post and interact with your audience."
      >
        <div className="col-span-full">
          <PageLoading />
        </div>
      </FormPanel>
    </Page>
  );
}
