import { db } from "@/database";
import { UserTable } from "@/database/schema";

import { env } from "@/lib/env/infra";

import users from "./data/user.data.json";

export async function seedUsers() {
  await db.transaction(async (tx) => {
    console.log("Seeding users...");

    const packages = await tx.query.PackageTable.findMany({
      columns: {
        id: true,
        title: true,
      },
    });

    // Create a Map of package titles to IDs for O(1) lookups
    const packageMap = new Map(packages.map((pkg) => [pkg.title, pkg.id]));

    const userData = users.map(({ packageName, ...user }) => {
      const packageId = packageMap.get(packageName);
      if (!packageId) {
        throw new Error(`Invalid package title "${packageName}" found in user data`);
      }
      return {
        ...user,
        id: env.SEED_CLERK_USER_ID,
        stripeId: env.SEED_STRIPE_ID,
        email: env.SEED_USER_EMAIL,
        role: user.role as "admin" | "user",
        packageId,
      };
    });

    const insertResult = await tx.insert(UserTable).values(userData).returning({ id: UserTable.id });

    if (insertResult.length === 0) {
      throw new Error(`Users could not be created`);
    }

    console.log("  ... Users seeded successfully: ", insertResult.length);
  });
}
