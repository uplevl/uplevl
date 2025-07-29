import { type UserJSON } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";

import { type UserInsert, type UserUpdate } from "@/database/schema";

import { env } from "@/lib/env/server";
import { getPostHogServer } from "@/lib/posthog-server";

import { deleteUser, insertUser, updateUser } from "@/data/user/mutations";

interface WebhookResponse {
  status: number;
  message: string;
}

async function handleUserCreated(data: UserJSON): Promise<WebhookResponse> {
  try {
    const posthog = getPostHogServer();
    const { id, email_addresses, first_name, last_name, image_url } = data;

    if (!id || !email_addresses?.length) {
      return { status: 400, message: "Missing required user data" };
    }

    const email = email_addresses[0].email_address;

    const userData: UserInsert = {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email,
      imageUrl: image_url,
    };

    await insertUser(userData);
    posthog.capture({
      distinctId: id,
      event: "user_signed_up",
      properties: {
        email,
        firstName: first_name,
        lastName: last_name,
        role: "user",
      },
    });

    return { status: 200, message: "User created successfully" };
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof Error) {
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Error creating user" };
  }
}

async function handleUserUpdated(data: UserJSON): Promise<WebhookResponse> {
  try {
    const { id, first_name, last_name, image_url } = data;

    if (!id) {
      return { status: 400, message: "Missing user ID" };
    }

    const userData: UserUpdate = {
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url,
    };

    await updateUser(id, userData);

    return { status: 200, message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);

    if (error instanceof Error) {
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Error updating user" };
  }
}

async function handleUserDeleted(data: UserJSON): Promise<WebhookResponse> {
  try {
    const { id } = data;

    if (!id) {
      return { status: 400, message: "Missing user ID" };
    }

    await deleteUser(id);

    return { status: 200, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);

    if (error instanceof Error) {
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Error deleting user" };
  }
}

const eventHandlers = {
  "user.created": handleUserCreated,
  "user.updated": handleUserUpdated,
  "user.deleted": handleUserDeleted,
} as const;

/**
 * Handles synching user data from Clerk to the database.
 */
export async function POST(request: NextRequest) {
  try {
    const evt = await verifyWebhook(request);
    const data = evt.data as UserJSON;
    const eventType = evt.type;

    if (env.NODE_ENV === "development") {
      console.log("Webhook received:", eventType);
      console.log("Webhook data:", data);
    }

    const handler = eventHandlers[eventType as keyof typeof eventHandlers];
    if (!handler) {
      return new Response("Unsupported event type", { status: 400 });
    }

    const { status, message } = await handler(data);

    if (status === 200) {
      revalidatePath("/", "layout");
    }

    return new Response(message, { status });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Error processing webhook", { status: 400 });
  }
}
