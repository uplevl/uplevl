import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

import { getIntegrations } from "@/api/actions/integrations/queries";

import { IntegrationCard } from "@/components/features/integrations/integration-card";

export default async function PageContent() {
  const integrations = await getIntegrations();

  const instagramIntegration = integrations.find((integration) => integration.name === "instagram");
  const isInstagramIntegrated = Boolean(instagramIntegration);
  const facebookIntegration = integrations.find((integration) => integration.name === "facebook");
  const isFacebookIntegrated = Boolean(facebookIntegration);

  return (
    <>
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
    </>
  );
}
