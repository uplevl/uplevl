"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { createContext, useContext } from "react";

import { PageLoading } from "@/components/page-loading";

import { type AgentWithOfferings, getAgentByClerkId } from "../../actions/agent";

const AgentContext = createContext<AgentWithOfferings>({} as AgentWithOfferings);

interface AgentProviderProps {
  children: React.ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const { user } = useUser();
  const { data: agent, isLoading } = useQuery({
    queryKey: ["agent"],
    enabled: !!user?.id,
    queryFn: () => getAgentByClerkId(user!.id!),
  });

  if (!agent && isLoading) {
    return <PageLoading />;
  }

  if (!agent) {
    return redirect("/onboarding");
  }

  return <AgentContext.Provider value={agent}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  const agent = useContext(AgentContext);
  if (!agent) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return agent;
}
