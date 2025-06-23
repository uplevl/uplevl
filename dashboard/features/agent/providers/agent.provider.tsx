import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import { PageLoading } from "@@/components/page-loading";

import { AgentContext } from "../contexts/agent.context";
import { AgentService } from "../services/agent.service";

interface AgentProviderProps {
  children: React.ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const { userId } = useAuth();
  const {
    data: agent,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["agent", userId],
    queryFn: () => AgentService.getAgentByClerkId(userId ?? ""),
    enabled: !!userId,
  });

  if (!agent || isLoading) {
    return <PageLoading />;
  }

  return <AgentContext.Provider value={agent}>{children}</AgentContext.Provider>;
}
