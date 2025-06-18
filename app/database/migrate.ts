import { migrate } from "drizzle-orm/postgres-js/migrator";
import { z } from "zod/v4";

import { connection, db } from "@/database";

import drizzleConfig from "../../drizzle.config";

const EnvSchema = z.object({
  DB_MIGRATING: z.coerce.boolean().default(false),
  DATABASE_URL: z.string().url(),
});

(async () => {
  try {
    const env = EnvSchema.parse(process.env);

    if (!env.DB_MIGRATING) {
      throw new Error("You must set DB_MIGRATING to true when running migrations");
    }

    console.log("[Uplevl]: ⚙️ Migrating database...");
    await migrate(db, { migrationsFolder: drizzleConfig.out });
    console.log("[Uplevl]: ✅ Database migrated successfully");
  } catch (error) {
    console.error("[Uplevl]: ❌ Error migrating database:", error);
  } finally {
    await connection.end();
  }
})();
