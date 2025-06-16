CREATE TYPE "public"."user_roles" AS ENUM('admin', 'user', 'superadmin');--> statement-breakpoint
ALTER TABLE "agents" DROP CONSTRAINT "agents_id_unique";--> statement-breakpoint
ALTER TABLE "agents" DROP CONSTRAINT "agents_user_id_users_clerk_id_fk";
--> statement-breakpoint
ALTER TABLE "packages_features" DROP CONSTRAINT "packages_features_package_id_packages_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions_summaries" DROP CONSTRAINT "sessions_summaries_session_id_sessions_id_fk";
--> statement-breakpoint
DROP INDEX "sessions_session_id_agent_id_unique_idx";--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offerings" ALTER COLUMN "agent_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offerings_prices" ALTER COLUMN "offering_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions_summaries" ALTER COLUMN "session_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packages_features" ADD CONSTRAINT "packages_features_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions_summaries" ADD CONSTRAINT "sessions_summaries_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "integrations_user_id_idx" ON "integrations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "integrations_agent_id_idx" ON "integrations" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "packages_features_package_id_idx" ON "packages_features" USING btree ("package_id");