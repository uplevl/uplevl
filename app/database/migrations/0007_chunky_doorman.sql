ALTER TABLE "integrations" DROP CONSTRAINT "integrations_user_id_users_clerk_id_fk";
--> statement-breakpoint
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_agent_id_agents_uuid_fk";
--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_agent_id_agents_uuid_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("uuid") ON DELETE cascade ON UPDATE no action;