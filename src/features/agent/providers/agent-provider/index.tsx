"use client";

import { createContext, useContext } from "react";

import { type AgentWithOfferings } from "../../actions/agent";

const AgentContext = createContext<AgentWithOfferings>({} as AgentWithOfferings);

interface AgentProviderProps {
  children: React.ReactNode;
  agent: AgentWithOfferings;
}

export function AgentProvider({ children, agent }: AgentProviderProps) {
  return <AgentContext.Provider value={agent}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  const agent = useContext(AgentContext);
  if (!agent) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return agent;
}
