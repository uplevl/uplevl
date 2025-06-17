import { type UserJSON } from "@clerk/backend";
import { createClerkClient } from "@clerk/backend";
import { eq } from "drizzle-orm";

import { env } from "@/env";

import { db } from "@/database";
import { type UserInsert, type UserUpdate, users } from "@/database/schema";

// Initialize Clerk client
const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });

/**
 * Standard response format for all webhook handlers
 */
interface WebhookResponse {
  status: number;
  message: string;
}

/**
 * Handles user creation webhook from Clerk
 * Creates a new user or updates existing user if clerkId already exists
 * Automatically assigns admin role for internal email domains
 */
export async function create(data: UserJSON): Promise<WebhookResponse> {
  try {
    // Extract required fields from webhook payload
    const { id: clerkId, email_addresses, first_name, last_name, primary_email_address_id } = data;

    // Validate required fields are present
    if (!clerkId || !email_addresses?.length) {
      return { status: 400, message: "Missing required user data" };
    }

    // Find primary email or default to first email
    const primaryEmail =
      email_addresses.find((email) => email.id === primary_email_address_id)?.email_address ??
      email_addresses[0].email_address;
    const isInternal = env.INTERNAL_DOMAINS.some((domain) =>
      primaryEmail.toLowerCase().endsWith(`@${domain.toLowerCase()}`),
    );
    const role = isInternal ? "admin" : "user";

    // Prepare user data for database insertion
    const userData: UserInsert = {
      clerkId: clerkId,
      firstName: first_name,
      lastName: last_name,
      email: primaryEmail,
      role,
    };

    // Insert or update user using upsert operation
    await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.clerkId,
      set: userData,
    });

    // Update user metadata in Clerk
    await clerk.users.updateUser(clerkId, {
      publicMetadata: { role },
    });

    return { status: 200, message: "User created or updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      // Handle unique constraint violations
      if (error.message.includes("unique_violation")) {
        return { status: 409, message: "User already exists" };
      }
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Unknown error" };
  }
}

/**
 * Handles user update webhook from Clerk
 * Updates user's first and last name if provided
 * Returns 404 if user doesn't exist
 */
export async function update(data: UserJSON): Promise<WebhookResponse> {
  try {
    // Extract fields from webhook payload
    const { id: clerkId, first_name, last_name } = data;

    // Validate user ID is present
    if (!clerkId) {
      return { status: 400, message: "Missing user ID" };
    }

    // Prevent no-op updates by checking if any fields are provided
    if (!first_name && !last_name) {
      return { status: 400, message: "No update fields provided" };
    }

    // Prepare update data
    const userData: UserUpdate = {
      firstName: first_name,
      lastName: last_name,
    };

    // Update user and return updated record
    const [result] = await db.update(users).set(userData).where(eq(users.clerkId, clerkId)).returning();

    // Check if user exists
    if (!result) {
      return { status: 404, message: "User not found" };
    }

    // Update user metadata in Clerk to keep role in sync
    await clerk.users.updateUser(clerkId, {
      publicMetadata: { role: result.role },
    });

    return { status: 200, message: "User updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Unknown error" };
  }
}

/**
 * Handles user deletion webhook from Clerk
 * Performs soft delete by setting deletedAt timestamp
 * Returns 404 if user doesn't exist
 */
export async function remove(data: UserJSON): Promise<WebhookResponse> {
  try {
    // Extract user ID from webhook payload
    const { id: clerkId } = data;

    // Validate user ID is present
    if (!clerkId) {
      return { status: 400, message: "Missing user ID" };
    }

    // Perform soft delete by setting deletedAt timestamp
    const [result] = await db
      .update(users)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(users.clerkId, clerkId))
      .returning();

    // Check if user exists
    if (!result) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 400, message: error.message };
    }

    return { status: 400, message: "Unknown error" };
  }
}
