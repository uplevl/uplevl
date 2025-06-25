import { RedirectToSignIn } from "@clerk/nextjs";
import { Suspense } from "react";

import { PageLoading } from "@/components/page-loading";

import { getAgentByClerkId } from "@/features/agent/actions/agent";
import { getCurrentUser } from "@/features/auth/actions/user";

import { AgentProvider } from "../agent-provider";
import AgentFormProviderClient from "./agent-form-provider-client";

export default function AgentFormProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoading />}>
      <SuspendedAgentFormProvider>{children}</SuspendedAgentFormProvider>
    </Suspense>
  );
}

async function SuspendedAgentFormProvider({ children }: { children: React.ReactNode }) {
  const { userId } = await getCurrentUser();
  if (!userId) return <RedirectToSignIn />;

  const agent = await getAgentByClerkId(userId);
  // TODO: Handle non existing agent (redirect to onboarding)
  if (!agent) return null;

  return (
    <AgentProvider agent={agent}>
      <AgentFormProviderClient>{children}</AgentFormProviderClient>
    </AgentProvider>
  );
}
