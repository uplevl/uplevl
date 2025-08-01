import "server-only";

import * as schema from "@/database/schema";

import { runSocialAgent } from "@/features/social-media/agents/social";
import { sendInstagramComment, sendInstagramDM } from "@/features/social-media/integrations/instagram";

interface InstagramCommentEntry {
  id: string; // Customer user id
  time: number;
  changes: {
    value: {
      from: { id: string; username: string }; // The customer user id
      media: { id: string; media_product_type: string }; // The post id
      id: string; // The comment id
      text: string; // The comment text
    };
    field: string; // "comments"
  }[];
}

export async function runInstagramCommentAutomation(entry: InstagramCommentEntry) {
  try {
    const message = entry.changes[0].value;

    const entityId = message.media.id;
    const senderId = message.from.id;
    const senderUsername = message.from.username;
    const commentId = message.id;
    const userId = entry.id;

    // Ignore comments from the user themselves.
    if (senderId === userId) return;

    const response = await runSocialAgent({
      strategy: schema.INTEGRATION_STRATEGIES.INSTAGRAM,
      type: "comment",
      userId,
      senderId,
      senderUsername,
      entityId,
      commentId,
      message: message.text,
    });

    if (response.error !== null) {
      console.error("Error running social agent", response.error);
      return;
    }

    await sendInstagramComment({
      commentId,
      message: response.response,
      token: response.token,
    });
  } catch (error) {
    console.error("Error handling instagram comment", error);
    if (error instanceof Error) {
      return { message: error.message, status: 500 };
    }
    return { message: "Error handling instagram comment", status: 500 };
  }

  return { message: "Instagram comment processed", status: 200 };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runInstagramMessageAutomation(entry: any) {
  try {
    const message = entry.messaging[0];
    const userId = message.recipient.id as string;
    const senderId = message.sender.id as string;

    // Ignore messages from the user themselves.
    if (senderId === userId) return;

    const response = await runSocialAgent({
      type: "message",
      strategy: schema.INTEGRATION_STRATEGIES.INSTAGRAM,
      userId,
      senderId,
      message: message.message.text,
    });

    if (response.error !== null) {
      console.error("Error running social agent", response.error);
      return;
    }

    await sendInstagramDM({
      userId: userId,
      receiverId: senderId,
      message: response.response,
      token: response.token,
    });
  } catch (error) {
    console.error("Error handling instagram message", error);
    if (error instanceof Error) {
      return { message: error.message, status: 500 };
    }
    return { message: "Error handling instagram message", status: 500 };
  }
}
