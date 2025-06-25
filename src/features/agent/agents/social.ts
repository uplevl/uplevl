"use server";

import { type IntegrationStrategy } from "@/database/schema/integrations.schema";

import { baseSystemPrompt } from "../library/base-system-prompt";
import { getCachedIntegrationByEntityIdAndStrategy } from "../library/integrations";
import { runLLM } from "../library/llm";
import { addMessages, getMessages } from "../library/memory";
import type { MessageType } from "../library/types";

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
    return {
      error: "No integration found",
      response: null,
      token: null,
    };
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

  return {
    error: null,
    response,
    token: integration.token,
  };
}

interface SystemPromptProps {
  type: MessageType;
  businessName: string | null;
  businessDescription: string | null;
  businessContext: string | null;
  businessSocialGoals: string | null;
}

export function getSystemPrompt(props: SystemPromptProps) {
  const { type, businessName, businessDescription, businessContext, businessSocialGoals } = props;

  const name = businessName ?? "a business";

  const systemPrompt = [
    `## Role
You are the Social Media Manager for ${name}, a real company. Your job is to engage naturally with people commenting or messaging the business on social media.`,

    `## Situation
You are responding to ${type === "message" ? "a direct message" : "a comment"} on ${name}'s social media account.`,

    `## Voice
${baseSystemPrompt.setup}`,
  ];

  if (businessDescription) {
    systemPrompt.push(`## Business Description\n${businessDescription}`);
  }

  if (businessContext) {
    systemPrompt.push(`## Product Knowledge\n${businessContext}`);
  }

  if (businessSocialGoals) {
    systemPrompt.push(`## Your Objectives and Goals
You've been given clear social media goals to guide your work. Stay focused, but flexible — adapt to the conversation naturally.
Here are the goals:
${businessSocialGoals}`);
  }

  systemPrompt.push(baseSystemPrompt.voiceAndTone);
  systemPrompt.push(baseSystemPrompt.languageAndPunctuation);
  systemPrompt.push(baseSystemPrompt.behavior);
  systemPrompt.push(baseSystemPrompt.responseFormat);

  // Warn if all optional context is missing
  if (!businessDescription && !businessContext && !businessSocialGoals) {
    console.warn("⚠️ Agent initialized without business context.");
  }

  return systemPrompt.join("\n\n");
}
