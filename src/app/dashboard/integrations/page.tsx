import { RedirectToSignIn } from "@clerk/nextjs";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

import { FormPanel } from "@/components/form-panel";
import { Page, PageHeader } from "@/components/page";

import { getCurrentUser } from "@/features/auth/actions/user";
import { getIntegrationsByUserId } from "@/features/integrations/actions/services";
import { IntegrationCard } from "@/features/integrations/components/integration-card";
import { IntegrationsProvider } from "@/features/integrations/providers/integrations-provider";

export default async function IntegrationsPage() {
  const { userId } = await getCurrentUser();
  if (!userId) return <RedirectToSignIn />;

  const integrations = await getIntegrationsByUserId(userId);

  return (
    <IntegrationsProvider integrations={integrations}>
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
          />
          <IntegrationCard
            title="Facebook"
            description="Connect your Facebook account to your AI agent. This will allow you to post to your Facebook account from your AI agent."
            icon={<SiFacebook className="size-6" />}
            strategy="facebook"
          />
        </FormPanel>
      </Page>
    </IntegrationsProvider>
  );
}
