import { type getCurrentUser } from "./queries";

export type UserWithAllData = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>["user"]>;

export type UserRole = "admin" | "user" | "superadmin";
