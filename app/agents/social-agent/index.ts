import { type IntegrationStrategy } from "@/database/schema/integrations.schema";

import { sendInstagramComment, sendInstagramDM } from "../library/instagram";
import { getCachedIntegrationByEntityIdAndStrategy } from "../library/integrations";
import { runLLM } from "../library/llm";
import { addMessages, getMessages } from "../library/memory";
import { getSystemPrompt } from "./system-prompt";

interface SocialAgentBaseProps {
  strategy: IntegrationStrategy;
  userId: string;
  senderId: string;
  message: string;
}

interface SocialMessageAgentProps extends SocialAgentBaseProps {
  type: "message";
}

interface SocialCommentAgentProps extends SocialAgentBaseProps {
  type: "comment";
  commentId: string;
}

type SocialAgentProps = SocialMessageAgentProps | SocialCommentAgentProps;

export async function runSocialAgent(props: SocialAgentProps) {
  const cacheKey = `${props.strategy}:${props.type}:${props.userId}:${props.senderId}`;

  const history = await getMessages(cacheKey);
  const integration = await getCachedIntegrationByEntityIdAndStrategy(props.userId, props.strategy);

  if (!integration) {
    console.log("No integration. Stopping social agent for entity ID: ", props.userId);
    return;
  }

  const newMessages = await addMessages({
    cacheKey,
    messages: [...history, { role: "user", content: props.message }],
  });

  const systemPrompt = getSystemPrompt({
    type: props.type,
    businessName: integration.agent.businessName,
    businessDescription: integration.agent.businessDescription,
    businessContext: integration.agent.businessContext,
    businessSocialGoals: integration.agent.businessSocialGoals,
  });

  const response = await runLLM({
    systemPrompt,
    messages: newMessages,
  });

  await addMessages({
    cacheKey,
    messages: [...newMessages, { role: "assistant", content: response }],
  });

  if (props.type === "comment") {
    await sendInstagramComment({
      commentId: props.commentId,
      message: response,
      token: integration.token,
    });
  } else {
    await sendInstagramDM({
      userId: props.userId,
      receiverId: props.senderId,
      message: response,
      token: integration.token,
    });
  }
}
