import { type getAgent } from "@/features/agent-settings/api/queries";

export type AgentWithOfferings = NonNullable<Awaited<ReturnType<typeof getAgent>>>;
