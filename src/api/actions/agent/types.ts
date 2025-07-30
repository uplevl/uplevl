import { type getAgent } from "./queries";

export type AgentWithOfferings = NonNullable<Awaited<ReturnType<typeof getAgent>>>;
