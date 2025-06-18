import { baseSystemPrompt } from "../library/base-system-prompt";
import type { MessageType } from "../library/types";

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
