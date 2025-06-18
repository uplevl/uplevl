import { env } from "@/env";

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
