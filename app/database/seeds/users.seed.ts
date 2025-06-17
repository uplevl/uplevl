import { env } from "@/env";

import { db } from "@/database";
import * as schema from "@/database/schema";

import users from "./data/user.data.json";

export async function seedUsers() {
  await db.transaction(async (tx) => {
    console.log("Seeding users...");

    const packages = await tx.query.packages.findMany({
      columns: {
        id: true,
        title: true,
      },
    });

    const userData = users.map(({ packageName, ...user }) => ({
      ...user,
      clerkId: env.SEED_CLERK_USER_ID,
      stripeId: env.SEED_STRIPE_ID,
      email: env.SEED_USER_EMAIL,
      role: user.role as "admin" | "user",
      packageId: packages.find((p) => p.title === packageName)?.id || 0,
    }));

    const insertResult = await tx.insert(schema.users).values(userData).returning({ id: schema.users.id });

    if (insertResult.length === 0) {
      throw new Error(`Users could not be created`);
    }

    console.log("  ... Users seeded successfully: ", insertResult.length);
  });
}
