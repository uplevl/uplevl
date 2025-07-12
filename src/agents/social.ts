"use server";

import { type IntegrationStrategy } from "@/database/schema/integrations.schema";

import { getCachedIntegrationByEntityIdAndStrategy } from "@/data/integrations/queries";

import { baseSystemPrompt } from "./library/base-system-prompt";
import { runTextLLM } from "./library/llm";
import { addMessages, getMessages } from "./library/memory";
import type { MessageType } from "./library/types";

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

  // 1. Get the history of messages from the cache
  const history = await getMessages(cacheKey);

  // 2. Get the integration for the user
  const integration = await getCachedIntegrationByEntityIdAndStrategy(props.userId, props.strategy);

  // 3. If no integration is found, return an error
  if (!integration) {
    console.log("No integration. Stopping social agent for entity ID: ", props.userId);
    return {
      error: "No integration found",
      response: null,
      token: null,
    };
  }

  // 4. Add the new message to the cache
  const newMessages = await addMessages({
    cacheKey,
    messages: [...history, { role: "user", content: props.message }],
  });

  // 5. Get the system prompt
  const systemPrompt = getSystemPrompt({
    type: props.type,
    businessName: integration.agent.businessName,
    businessDescription: integration.agent.businessDescription,
    businessContext: integration.agent.businessContext,
    businessSocialGoals: integration.agent.businessSocialGoals,
  });

  // 6. Run the LLM
  const response = await runTextLLM({
    systemPrompt,
    messages: newMessages,
  });

  // 7. Add the response to the cache
  await addMessages({
    cacheKey,
    messages: [...newMessages, { role: "assistant", content: response }],
  });

  // 8. Return the response
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

function getSystemPrompt(props: SystemPromptProps) {
  const { type, businessName, businessDescription, businessContext, businessSocialGoals } = props;

  const name = businessName ?? "a business";

  const systemPrompt = [
    [
      "## Role",
      "You are the Social Media Manager for ${name}, a real company. Your job is to engage naturally with people commenting or messaging the business on social media.",
      "",
      "## Situation",
      `You are responding to ${type === "message" ? "a direct message" : "a comment"} on ${name}'s social media account.`,
      "",
      "## Voice",
      baseSystemPrompt.setup,
    ].join("\n"),
  ];

  // Warn if all optional context is missing
  if (!businessDescription && !businessContext && !businessSocialGoals) {
    console.warn("⚠️ Agent initialized without business context.");
  } else {
    if (businessDescription) {
      systemPrompt.push(["## Business Description", businessDescription].join("\n"));
    }

    if (businessContext) {
      systemPrompt.push(["## Product Knowledge", businessContext].join("\n"));
    }

    if (businessSocialGoals) {
      systemPrompt.push(
        [
          "## Your Objectives and Goals",
          "You've been given clear social media goals to guide your work. Stay focused, but flexible — adapt to the conversation naturally.",
          "Here are the goals:",
          businessSocialGoals,
        ].join("\n"),
      );
    }
  }

  systemPrompt.push(baseSystemPrompt.voiceAndTone);
  systemPrompt.push(baseSystemPrompt.languageAndPunctuation);
  systemPrompt.push(baseSystemPrompt.behavior);
  systemPrompt.push(baseSystemPrompt.responseFormat);

  return systemPrompt.join("\n\n");
}
