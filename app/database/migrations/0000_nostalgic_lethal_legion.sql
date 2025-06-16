CREATE TYPE "public"."integration_name" AS ENUM('instagram', 'facebook');--> statement-breakpoint
CREATE TYPE "public"."session_intent" AS ENUM('booking', 'inquiry', 'support', 'other');--> statement-breakpoint
CREATE TYPE "public"."session_source" AS ENUM('website', 'facebook', 'instagram');--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('open', 'engaged', 'converted', 'abandoned', 'spam');--> statement-breakpoint
CREATE TABLE "agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"user_id" text,
	"business_name" text,
	"business_description" text,
	"business_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "agents_id_unique" UNIQUE("id"),
	CONSTRAINT "agents_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"agent_id" uuid NOT NULL,
	"name" "integration_name" NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp,
	"entity_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "integrations_id_unique" UNIQUE("id"),
	CONSTRAINT "integrations_token_unique" UNIQUE("token"),
	CONSTRAINT "integrations_entity_id_unique" UNIQUE("entity_id")
);
--> statement-breakpoint
CREATE TABLE "offerings" (
	"id" serial PRIMARY KEY NOT NULL,
	"agent_id" uuid,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "offerings_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "offerings_prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"offering_id" integer,
	"price" integer NOT NULL,
	"tier" text,
	"unit" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "offerings_prices_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" integer NOT NULL,
	"special_price" integer,
	"stripe_price_id" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_pre_launch" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "packages_id_unique" UNIQUE("id"),
	CONSTRAINT "packages_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "packages_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"flag_key" text NOT NULL,
	"separator_after" boolean DEFAULT false NOT NULL,
	"is_highlighted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "packages_features_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"agent_id" uuid,
	"source" "session_source" NOT NULL,
	"status" "session_status" DEFAULT 'open' NOT NULL,
	"intent" "session_intent",
	"user_name" text,
	"user_email" text,
	"user_phone" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "sessions_id_unique" UNIQUE("id"),
	CONSTRAINT "sessions_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE "sessions_summaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"converted" boolean DEFAULT false NOT NULL,
	"conversation_type" text,
	"messages_count" integer,
	"duration_seconds" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_summaries_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text,
	"stripe_id" text,
	"package_id" integer NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_stripe_id_unique" UNIQUE("stripe_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_agent_id_agents_uuid_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offerings" ADD CONSTRAINT "offerings_agent_id_agents_uuid_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("uuid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "offerings_prices" ADD CONSTRAINT "offerings_prices_offering_id_offerings_id_fk" FOREIGN KEY ("offering_id") REFERENCES "public"."offerings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packages_features" ADD CONSTRAINT "packages_features_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_agent_id_agents_uuid_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions_summaries" ADD CONSTRAINT "sessions_summaries_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "agents_user_id_idx" ON "agents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "agents_deleted_at_idx" ON "agents" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "agents_uuid_idx" ON "agents" USING btree ("uuid");--> statement-breakpoint
CREATE INDEX "agents_is_active_idx" ON "agents" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "integrations_deleted_at_idx" ON "integrations" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "integrations_entity_id_idx" ON "integrations" USING btree ("entity_id");--> statement-breakpoint
CREATE INDEX "offerings_deleted_at_idx" ON "offerings" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "offerings_agent_id_idx" ON "offerings" USING btree ("agent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_session_id_agent_id_unique_idx" ON "sessions" USING btree ("session_id","agent_id");--> statement-breakpoint
CREATE INDEX "sessions_session_id_idx" ON "sessions" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "sessions_agent_id_idx" ON "sessions" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "sessions_deleted_at_idx" ON "sessions" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "sessions_summaries_session_id_idx" ON "sessions_summaries" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "users_clerk_id_idx" ON "users" USING btree ("clerk_id");--> statement-breakpoint
CREATE INDEX "users_stripe_id_idx" ON "users" USING btree ("stripe_id");--> statement-breakpoint
CREATE INDEX "users_is_active_idx" ON "users" USING btree ("is_active");