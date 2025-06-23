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
    error,
  } = useQuery({
    queryKey: ["agent", userId],
    queryFn: () => AgentService.getAgentByClerkId(userId ?? ""),
    enabled: !!userId,
  });

  // Show loading only when actually loading, not on error
  if (isLoading) {
    return <PageLoading />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-600">Error Loading Agent</h2>
          <p className="mb-4 text-gray-600">
            {error instanceof Error ? error.message : "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Only show provider if we have agent data
  if (!agent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-600">No Agent Found</h2>
          <p className="text-gray-500">Unable to load agent information.</p>
        </div>
      </div>
    );
  }

  return <AgentContext.Provider value={agent}>{children}</AgentContext.Provider>;
}
