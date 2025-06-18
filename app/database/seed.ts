import { getTableName, sql } from "drizzle-orm";
import { z } from "zod/v4";

import { connection, db } from "@/database";
import * as schema from "@/database/schema";
import * as seeds from "@/database/seeds";

const EnvSchema = z.object({
  DB_SEEDING: z.coerce.boolean().default(false),
  DATABASE_URL: z.string().url(),
});

try {
  const env = EnvSchema.parse(process.env);

  if (!env.DB_SEEDING) {
    throw new Error("You must set DB_SEEDING to true when running seeding");
  }

  console.time("Seeding Duration");

  const tables = [
    schema.packagesFeatures,
    schema.packages,
    schema.users,
    schema.offerings,
    schema.offeringsPrices,
    schema.agents,
    schema.sessions,
    schema.sessionsSummaries,
    schema.integrations,
  ];

  console.log("Truncating tables");
  await Promise.all(
    tables.map((table) => {
      return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
    }),
  );

  // system
  await seeds.packages();

  // user
  await seeds.users();
  await seeds.agents();

  // close connection
  await connection.end();
  console.timeEnd("Seeding Duration");
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An unknown error occurred", error);
  }
  await connection.end();
  console.timeEnd("Seeding Duration");
  process.exit(1);
}
