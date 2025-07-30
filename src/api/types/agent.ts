import { type getAgent } from "@/api/actions/agent/queries";

export type AgentWithOfferings = NonNullable<Awaited<ReturnType<typeof getAgent>>>;
