import "server-only";

import { redirect } from "next/navigation";

import { type IntegrationStrategy } from "@/database/schema";

import { env } from "@/lib/env/server";

import { getAgent } from "@/features/agent-settings/api/queries";
import { insertIntegration } from "@/features/social-media/api/mutations";
import { getIntegrationByStrategy } from "@/features/social-media/api/queries";
import { verifySession } from "@/features/user/api/queries";

export async function addNewIntegration(strategy: IntegrationStrategy, code: string) {
  try {
    await verifySession();
    const agent = await getAgent();
    const integration = await getIntegrationByStrategy(strategy);

    if (!agent) {
      return redirect("/onboarding");
    }

    // If the integration already exists, we don't need to do anything.
    if (integration !== undefined) {
      return;
    }

    const token = await generateInstagramAccessToken(code);

    if (!token) {
      throw new Error("Could not generate access token");
    }

    const instagramIdResponse = await fetch(
      `${env.META_INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`,
    );
    const data = await instagramIdResponse.json();
    console.log("✅ data", data);
    const instagramId = data.user_id;
    console.log("✅ instagramId", instagramId);

    const today = new Date();
    const expirationDate = today.setDate(today.getDate() + 60);

    await insertIntegration({
      name: "instagram",
      userId: agent.userId,
      agentId: agent.id,
      token: token.access_token,
      entityId: instagramId,
      expiresAt: new Date(expirationDate),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not add new integration");
  }
}

async function generateInstagramAccessToken(code: string) {
  const token = await getInstagramShortLivedToken(code);

  if (token.error_message) {
    console.error("❌ token", token.error_message);
    throw new Error(token.error);
  }

  if (token.permissions.length > 0) {
    console.log(token, "got permissions");
    const longToken = await fetch(
      `${env.META_INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${env.META_INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`,
    );
    return longToken.json();
  }
}

async function getInstagramShortLivedToken(code: string) {
  const formData = new FormData();
  formData.append("client_id", env.META_INSTAGRAM_CLIENT_ID);
  formData.append("client_secret", env.META_INSTAGRAM_CLIENT_SECRET);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", `${env.PUBLIC_URL}/callbacks/instagram`);
  formData.append("code", code);

  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log("🌐 short lived token data", data);
  return data;
}

/**
 * Configuration for sending a direct message on Instagram.
 * Contains all necessary information to send a message to another user.
 */
interface SendInstagramDMProps {
  /** ID of the user who is sending the message */
  userId: string;
  /** ID of the user who will receive the message */
  receiverId: string;
  /** The actual message content to be sent */
  message: string;
  /** Instagram API access token for authentication */
  token: string;
}

/**
 * Response from sending a direct message on Instagram.
 * Contains the IDs of the recipient and the sent message.
 */
interface InstagramDMResponse {
  /** ID of the message recipient */
  recipient_id: string;
  /** ID of the sent message */
  message_id: string;
}

/**
 * Configuration for sending a comment on Instagram.
 * Contains all necessary information to reply to an existing comment.
 */
interface SendInstagramCommentProps {
  /** ID of the comment that will receive the reply */
  commentId: string;
  /** The actual comment content to be sent */
  message: string;
  /** Instagram API access token for authentication */
  token: string;
}

/**
 * Response from sending a comment on Instagram.
 * Contains the ID of the created comment.
 */
interface InstagramCommentResponse {
  /** ID of the created comment */
  id: string;
}

/**
 * Configuration for making a request to the Instagram API.
 * Contains all necessary information to make an authenticated API call.
 */
interface InstagramRequestConfig {
  /** The API endpoint to call (without base URL and version) */
  endpoint: string;
  /** The request body to send to the API */
  body: Record<string, unknown>;
  /** Instagram API access token for authentication */
  token: string;
}

/**
 * Internal utility function that handles the common Instagram API request logic.
 * Manages authentication, error handling, and response parsing for all Instagram API calls.
 */
async function makeInstagramRequest<T>({ endpoint, body, token }: InstagramRequestConfig): Promise<T> {
  const response = await fetch(`${env.META_INSTAGRAM_BASE_URL}/v23.0/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error("Instagram API request failed", {
      status: response.status,
      statusText: response.statusText,
      body: await response.text(),
    });
    throw new Error("Instagram API request failed");
  }

  return response.json() as Promise<T>;
}

/**
 * Sends a direct message to another Instagram user.
 * Uses the Instagram Graph API to deliver the message to the specified recipient.
 */
export async function sendInstagramDM({
  userId,
  receiverId,
  message,
  token,
}: SendInstagramDMProps): Promise<InstagramDMResponse> {
  return makeInstagramRequest<InstagramDMResponse>({
    endpoint: `${userId}/messages`,
    body: {
      recipient: { id: receiverId },
      message: { text: message },
    },
    token,
  });
}

/**
 * Sends a reply to an existing Instagram comment.
 * Uses the Instagram Graph API to post the reply under the specified comment.
 */
export async function sendInstagramComment({
  commentId,
  message,
  token,
}: SendInstagramCommentProps): Promise<InstagramCommentResponse> {
  console.log("Sending comment to", commentId);
  return makeInstagramRequest<InstagramCommentResponse>({
    endpoint: `${commentId}/replies`,
    body: { message },
    token,
  });
}
