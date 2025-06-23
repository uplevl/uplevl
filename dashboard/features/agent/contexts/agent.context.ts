import { createContext } from "react";

import { type AgentService } from "../services/agent.service";

type AgentWithIntegrationsAndOfferings = NonNullable<Awaited<ReturnType<typeof AgentService.getAgentByClerkId>>>;

export const AgentContext = createContext<AgentWithIntegrationsAndOfferings>({} as AgentWithIntegrationsAndOfferings);
