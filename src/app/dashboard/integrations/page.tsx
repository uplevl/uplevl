import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

import { getIntegrations } from "@/data/integrations/queries";

import { FormPanel } from "@/components/common/form-panel";
import { Page, PageHeader } from "@/components/common/page";
import { IntegrationCard } from "@/components/features/integrations/integration-card";

export default async function IntegrationsPage() {
  const integrations = await getIntegrations();

  const instagramIntegration = integrations.find((integration) => integration.name === "instagram");
  const isInstagramIntegrated = Boolean(instagramIntegration);
  const facebookIntegration = integrations.find((integration) => integration.name === "facebook");
  const isFacebookIntegrated = Boolean(facebookIntegration);

  return (
    <Page>
      <PageHeader title="Integrations" description="Here you handle your social media connections." />
      <FormPanel
        title="Social Media Accounts"
        description="Connect the social media accounts you want to use with your AI agent. This will give Uplevl access to you account to post and interact with your audience."
      >
        <IntegrationCard
          title="Instagram"
          description="Connect your Instagram account to your AI agent. This will allow you to post to your Instagram account from your AI agent."
          icon={<SiInstagram className="size-6" />}
          strategy="instagram"
          isIntegrated={isInstagramIntegrated}
          integrationId={instagramIntegration?.id}
        />
        <IntegrationCard
          title="Facebook"
          description="Connect your Facebook account to your AI agent. This will allow you to post to your Facebook account from your AI agent."
          icon={<SiFacebook className="size-6" />}
          strategy="facebook"
          isIntegrated={isFacebookIntegrated}
          integrationId={facebookIntegration?.id}
        />
      </FormPanel>
    </Page>
  );
}
