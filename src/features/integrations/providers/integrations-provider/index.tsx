"use client";

import { createContext, useContext } from "react";

import { type Integration, type IntegrationStrategy } from "@/database/schema";

const IntegrationsContext = createContext<Integration[]>([]);

interface IntegrationsProviderProps {
  children: React.ReactNode;
  integrations: Integration[];
}

export function IntegrationsProvider({ children, integrations }: IntegrationsProviderProps) {
  return <IntegrationsContext.Provider value={integrations}>{children}</IntegrationsContext.Provider>;
}

export function useIntegrations() {
  const context = useContext(IntegrationsContext);

  if (!context) {
    throw new Error("useIntegrations must be used within an IntegrationsProvider");
  }

  return context;
}

export function useIsIntegrated(strategy: IntegrationStrategy) {
  const integrations = useIntegrations();

  return integrations.some((integration) => integration.name === strategy);
}

export function useIntegrationId(strategy: IntegrationStrategy) {
  const integrations = useIntegrations();

  return integrations.find((integration) => integration.name === strategy)?.id;
}
