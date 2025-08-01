import { type getCurrentUser } from "./api/queries";

export type UserWithAllData = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>["user"]>;

export type UserRole = "admin" | "user" | "superadmin";
