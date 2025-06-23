import { api } from "@@/lib/api";

export const AgentService = {
  async getAgentByClerkId(clerkId: string) {
    const response = await api.system.agent[":clerkId"].$get({
      param: {
        clerkId,
      },
    });
    const data = await response.json();

    if (!data.data || data.error) {
      console.error(data.error);
      return null;
    }

    return data.data;
  },
};
