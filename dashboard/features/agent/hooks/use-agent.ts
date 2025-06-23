import { use } from "react";

import { AgentContext } from "../contexts/agent.context";

export function useAgent() {
  const agent = use(AgentContext);
  return agent;
}
