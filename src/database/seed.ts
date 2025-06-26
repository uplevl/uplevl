import { getTableName, sql } from "drizzle-orm";

import { connection, db } from "@/database";
import * as schema from "@/database/schema";
import * as seeds from "@/database/seeds";

import { env } from "@/lib/env/server";

if (!env.DB_SEEDING) {
  throw new Error("You must set DB_SEEDING to true when running seeding");
}

console.time("Seeding Duration");

const tables = [
  schema.PackageFeatureTable,
  schema.PackageTable,
  schema.UserTable,
  schema.OfferingTable,
  schema.OfferingPriceTable,
  schema.AgentTable,
  schema.SessionTable,
  schema.SessionSummaryTable,
  schema.IntegrationTable,
  schema.PostTable,
  schema.PostMetaTable,
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
