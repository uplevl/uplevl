CREATE TYPE "public"."integration_name" AS ENUM('instagram', 'facebook');--> statement-breakpoint
CREATE TYPE "public"."session_intent" AS ENUM('booking', 'inquiry', 'support', 'other');--> statement-breakpoint
CREATE TYPE "public"."session_source" AS ENUM('website', 'facebook', 'instagram');--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('open', 'engaged', 'converted', 'abandoned', 'spam');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('admin', 'user', 'superadmin');--> statement-breakpoint
CREATE TABLE "agents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"business_name" varchar,
	"business_description" text,
	"business_url" varchar,
	"business_social_goals" text,
	"business_context" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"agent_id" uuid NOT NULL,
	"name" "integration_name" NOT NULL,
	"token" varchar(512) NOT NULL,
	"expires_at" timestamp,
	"entity_id" varchar(128) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "integrations_token_unique" UNIQUE("token"),
	CONSTRAINT "integrations_entity_id_unique" UNIQUE("entity_id")
);
--> statement-breakpoint
CREATE TABLE "offerings_prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"offering_id" integer NOT NULL,
	"price" integer NOT NULL,
	"tier" varchar(128),
	"unit" varchar(128),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "offerings" (
	"id" serial PRIMARY KEY NOT NULL,
	"agent_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text,
	"sort_order" smallint DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "packages_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_id" integer NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"icon" varchar NOT NULL,
	"sort_order" smallint DEFAULT 0 NOT NULL,
	"flag_key" varchar NOT NULL,
	"separator_after" boolean DEFAULT false NOT NULL,
	"is_highlighted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "packages_features_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128) NOT NULL,
	"price" integer NOT NULL,
	"special_price" integer,
	"stripe_price_id" varchar(128) NOT NULL,
	"sort_order" smallint DEFAULT 0 NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_pre_launch" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "packages_title_unique" UNIQUE("title"),
	CONSTRAINT "packages_stripe_price_id_unique" UNIQUE("stripe_price_id")
);
--> statement-breakpoint
CREATE TABLE "sessions_summaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"converted" boolean DEFAULT false NOT NULL,
	"conversation_type" varchar(128),
	"messages_count" integer,
	"duration_seconds" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar NOT NULL,
	"agent_id" uuid,
	"source" "session_source" NOT NULL,
	"status" "session_status" DEFAULT 'open' NOT NULL,
	"intent" "session_intent",
	"user_name" varchar,
	"user_email" varchar,
	"user_phone" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "sessions_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"stripe_id" varchar(128),
	"package_id" serial NOT NULL,
	"email" varchar NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"role" "user_roles" DEFAULT 'user' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_stripe_id_unique" UNIQUE("stripe_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offerings_prices" ADD CONSTRAINT "offerings_prices_offering_id_offerings_id_fk" FOREIGN KEY ("offering_id") REFERENCES "public"."offerings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offerings" ADD CONSTRAINT "offerings_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "packages_features" ADD CONSTRAINT "packages_features_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions_summaries" ADD CONSTRAINT "sessions_summaries_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "agents_user_id_idx" ON "agents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "agents_deleted_at_idx" ON "agents" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "agents_is_active_idx" ON "agents" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "integrations_user_id_idx" ON "integrations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "integrations_agent_id_idx" ON "integrations" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "integrations_deleted_at_idx" ON "integrations" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "offerings_deleted_at_idx" ON "offerings" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "offerings_agent_id_idx" ON "offerings" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "packages_features_package_id_idx" ON "packages_features" USING btree ("package_id");--> statement-breakpoint
CREATE INDEX "packages_features_sort_order_idx" ON "packages_features" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX "sessions_summaries_session_id_idx" ON "sessions_summaries" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "sessions_agent_id_idx" ON "sessions" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "sessions_deleted_at_idx" ON "sessions" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "users_is_active_idx" ON "users" USING btree ("is_active");