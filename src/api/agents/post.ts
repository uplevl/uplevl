"use server";

import { Agent, run } from "@openai/agents";
import z from "zod";

import { getAgent } from "@/api/actions/agent/queries";
import { verifySession } from "@/api/actions/user/queries";

export interface SocialMediaPost {
  imageUrl: string;
  content: string;
}

interface RunPostAgentProps {
  imageUrl: string;
  description?: string;
}

export async function runPostAgent(props: RunPostAgentProps): Promise<SocialMediaPost> {
  const { imageUrl, description } = props;

  await verifySession();
  const agent = await getAgent();

  if (!agent) {
    throw new Error("Agent not found");
  }

  const businessContextLines = [
    agent.businessName ? `Business Name: ${agent.businessName}` : null,
    agent.businessDescription ? `Business Description: ${agent.businessDescription}` : null,
    agent.offerings && agent.offerings.length > 0
      ? `Business Offerings: ${agent.offerings.map((o) => o.title).join(", ")}`
      : null,
    agent.businessSocialGoals ? `Social Media Goals: ${agent.businessSocialGoals}` : null,
  ].filter(Boolean);

  const imageAnalyzerAgent = new Agent({
    name: "image-analysis-agent",
    instructions: [
      "You are a visual analysis assistant working for a business's social media team.",
      ...businessContextLines,
      "You are given the URL of an image and optionally a short description written by the uploader.",
      "Analyze the image and return a plain-text summary describing what it shows, including relevant visual elements, context, and mood.",
      "This summary will be used by a content creator to craft a marketing post for social media.",
      "Do not include hashtags, emojis, or any formatting. Just return a short, natural description in plain language.",
    ].join(" "),
    model: "gpt-4o-mini",
    modelSettings: {
      temperature: 0.1,
    },
    outputType: z.object({
      summary: z.string(),
    }),
  });

  const socialMediaContentCreatorAgent = new Agent({
    name: "social-media-content-creator-agent",
    instructions: [
      "You are a social media content writer for a small business. You’re given a summary of a photo and optionally a description written by the business owner.",
      ...businessContextLines,
      "Your job is to write a short, human post that feels authentic and engaging — as if a real person from the business shared it.",
      "Don't pitch a product. Don’t write like an ad. Just share the story, moment, or feeling behind the image.",
      "Write like a proud owner or team member. Use natural, direct language. Avoid hype, sales language, or generic phrases.",
      "No hashtags, no emojis, no Markdown. Just a short, compelling caption that brings the image to life.",
    ].join(" "),
    model: "gpt-4o",
    modelSettings: {
      temperature: 0.7,
    },
    outputType: z.object({
      postContent: z.string(),
    }),
  });

  const socialMediaPostSynthesizerAgent = new Agent({
    name: "social-media-post-synthesizer-agent",
    instructions: [
      "You’re refining a social media caption written by a small business.",
      ...businessContextLines,
      "Make sure it flows naturally and reads clearly.",
      "If appropriate, add 1–2 subtle hashtags that match the content and business goals, but only if they feel natural.",
      "Do not add emojis, marketing language, or generic AI phrasing.",
      "Do not use Markdown. Keep the voice authentic and simple.",
    ].join(" "),
    model: "gpt-4o",
    modelSettings: {
      temperature: 0.4,
    },
    outputType: z.object({
      postContent: z.string(),
    }),
  });

  const orchestratorAgent = new Agent({
    name: "Orchestrator",
    instructions: [
      "You orchestrate the workflow of analyzing an image and producing a marketing post.",
      "Step 1: Pass the image URL and optional description to the image-analysis-agent to receive a detailed summary.",
      "Step 2: Pass the image summary and any uploader description to the social-media-content-creator-agent to generate a social media post.",
      "Step 3: Pass the image summary and the social media post draft to the social-media-post-synthesizer-agent to refine the post and add relevant hashtags.",
      "Step 4: Return only the final social media post created by the social-media-post-synthesizer-agent.",
    ].join(" "),
    model: "gpt-4.1-nano",
    modelSettings: {
      temperature: 0.1,
    },
    tools: [
      imageAnalyzerAgent.asTool({
        toolName: "image_analysis_agent",
        toolDescription: "Analyze an image and return a summary",
      }),
      socialMediaContentCreatorAgent.asTool({
        toolName: "social_media_content_creator_agent",
        toolDescription: "Create a social media post based on an image summary",
      }),
      socialMediaPostSynthesizerAgent.asTool({
        toolName: "social_media_post_synthesizer_agent",
        toolDescription: "Refine a social media post and add relevant hashtags",
      }),
    ],
    outputType: z.object({
      imageUrl: z.string(),
      postContent: z.string(),
    }),
  });

  const result = await run(
    orchestratorAgent,
    [
      "Create a new social media post form the following image:",
      `- URL: "${imageUrl}"`,
      `${description ? `- Description by uploader: "${description}"` : ""}`,
    ].join("\n"),
  );

  const generatedPost = result.finalOutput;

  if (!generatedPost) {
    throw new Error("No post generated");
  }

  return {
    imageUrl: imageUrl,
    content: generatedPost.postContent,
  };
}
