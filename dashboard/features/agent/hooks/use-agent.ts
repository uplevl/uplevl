import { use } from "react";

import { AgentContext } from "../contexts/agent.context";

export function useAgent() {
  const agent = use(AgentContext);

  if (!agent) {
    throw new Error("useAgent must be used within an AgentProvider");
  }

  return agent;
}
