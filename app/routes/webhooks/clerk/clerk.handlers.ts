import { type UserJSON } from "@clerk/backend";
import { eq } from "drizzle-orm";

import { env } from "@/env";

import { db } from "@/database";
import { type UserInsert, type UserUpdate, users } from "@/database/schema";

interface WebhookResponse {
  status: number;
  message: string;
}

export async function create(data: UserJSON): Promise<WebhookResponse> {
  try {
    const { id: clerkId, email_addresses, first_name, last_name } = data;

    if (!clerkId || !email_addresses?.length) {
      return { status: 400, message: "Missing required user data" };
    }

    const email = email_addresses[0].email_address;
    const isInternal = env.INTERNAL_DOMAINS.some((domain) => email.endsWith(`@${domain}`));

    const userData: UserInsert = {
      clerkId: clerkId,
      firstName: first_name,
      lastName: last_name,
      email,
      role: isInternal ? "admin" : "user",
    };

    const [result] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.clerkId,
        set: userData,
      })
      .returning();

    if (!result) {
      return { status: 409, message: "User already exists" };
    }

    return { status: 200, message: "User created or updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      // Check if it's a unique violation error
      if (error.message.includes("unique_violation")) {
        return { status: 409, message: "User already exists" };
      }
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Unknown error" };
  }
}

export async function update(data: UserJSON): Promise<WebhookResponse> {
  try {
    const { id: clerkId, first_name, last_name } = data;

    if (!clerkId) {
      return { status: 400, message: "Missing user ID" };
    }

    const userData: UserUpdate = {
      firstName: first_name,
      lastName: last_name,
    };

    const [result] = await db.update(users).set(userData).where(eq(users.clerkId, clerkId)).returning();

    if (!result) {
      return { status: 400, message: "Error updating user" };
    }

    return { status: 200, message: "User updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Unknown error" };
  }
}

export async function remove(data: UserJSON): Promise<WebhookResponse> {
  try {
    const { id: clerkId } = data;

    if (!clerkId) {
      return { status: 400, message: "Missing user ID" };
    }

    const [result] = await db
      .update(users)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(users.clerkId, clerkId))
      .returning();

    if (!result) {
      return { status: 400, message: "Error deleting user" };
    }

    return { status: 200, message: "User deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Unknown error" };
  }
}
