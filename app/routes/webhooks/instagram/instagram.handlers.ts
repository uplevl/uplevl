import { runSocialAgent } from "@/agents/social-agent";
import * as schema from "@/database/schema";
import { HandledResponse } from "@/lib/handled-response";
import { tryCatch } from "@/lib/try-catch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function comment(entry: any): Promise<HandledResponse> {
  const { error } = await tryCatch(async () => {
    const message = entry.changes[0].value;
    const senderId = message.from.id as string;
    const commentId = message.id as string;
    const userId = entry.id as string;

    // Ignore comments from the user themselves.
    if (senderId === userId) return;

    await runSocialAgent({
      strategy: schema.INTEGRATION_STRATEGIES.INSTAGRAM,
      type: "comment",
      userId,
      senderId,
      commentId,
      message,
    });
  });

  if (error) {
    console.error("Error handling instagram comment", error);
    return new HandledResponse(error.message, 500);
  }

  return new HandledResponse("Comment processed", 200);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function message(entry: any): Promise<HandledResponse> {
  const { error } = await tryCatch(async () => {
    const message = entry.messaging[0];
    const userId = message.recipient.id as string;
    const senderId = message.sender.id as string;

    // Ignore messages from the user themselves.
    if (senderId === userId) return;

    await runSocialAgent({
      type: "message",
      strategy: schema.INTEGRATION_STRATEGIES.INSTAGRAM,
      userId,
      senderId,
      message: message.message.text,
    });
  });

  if (error) {
    console.error("Error handling instagram message", error);
    return new HandledResponse(error.message, 500);
  }

  return new HandledResponse("Message processed", 200);
}
