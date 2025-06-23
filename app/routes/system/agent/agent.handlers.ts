import { eq } from "drizzle-orm";

import { db } from "@/database";
import type { AgentInsert, AgentUpdate } from "@/database/schema";
import { AgentInsertSchema, AgentTable, AgentUpdateSchema } from "@/database/schema";
import { ContentfulResponse } from "@/lib/contentful-response";

export async function getByClerkId(clerkId: string) {
  const agent = await db.query.AgentTable.findFirst({
    where: eq(AgentTable.userId, clerkId),
    with: {
      offerings: true,
      integrations: true,
    },
  });

  if (!agent) {
    const error = new Error("Agent not found");
    console.error(error);
    return new ContentfulResponse(null, error);
  }

  return new ContentfulResponse(agent, null);
}

export async function create(clerkId: string, data: AgentInsert) {
  try {
    const parsedData = AgentInsertSchema.parse(data);

    const result = await db
      .insert(AgentTable)
      .values({
        ...parsedData,
        userId: clerkId,
      })
      .returning();

    if (result.length === 0) {
      const error = new Error("Failed to create agent");
      console.error(error);
      return new ContentfulResponse(null, error);
    }

    return new ContentfulResponse(result[0], null);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error(errorMessage);
    return new ContentfulResponse(null, new Error(errorMessage));
  }
}

export async function update(clerkId: string, data: AgentUpdate) {
  try {
    const parsedData = AgentUpdateSchema.parse(data);
    const result = await db.update(AgentTable).set(parsedData).where(eq(AgentTable.userId, clerkId)).returning();

    if (result.length === 0) {
      const error = new Error("Failed to update agent");
      console.error(error);
      return new ContentfulResponse(null, error);
    }

    return new ContentfulResponse(result[0], null);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error(errorMessage);
    return new ContentfulResponse(null, new Error(errorMessage));
  }
}
