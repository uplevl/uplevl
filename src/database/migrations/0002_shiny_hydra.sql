CREATE TYPE "public"."post_review_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "post_meta" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" uuid NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_id" uuid NOT NULL,
	"user_id" varchar NOT NULL,
	"content" text NOT NULL,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"review_status" "post_review_status" DEFAULT 'pending' NOT NULL,
	"reviewed_by" varchar(128),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "user_id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "business_name" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "business_url" SET DATA TYPE varchar(2083);--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "user_id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "offerings" ALTER COLUMN "title" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "offerings" ALTER COLUMN "category" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "packages_features" ALTER COLUMN "title" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "packages_features" ALTER COLUMN "description" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "packages_features" ALTER COLUMN "icon" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "packages_features" ALTER COLUMN "flag_key" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "session_id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_phone" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image_url" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image_url" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "sessions_summaries" ADD COLUMN "summary" text;--> statement-breakpoint
ALTER TABLE "post_meta" ADD CONSTRAINT "post_meta_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "post_meta_post_id_idx" ON "post_meta" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "post_meta_deleted_at_idx" ON "post_meta" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "post_meta_key_idx" ON "post_meta" USING btree ("key");--> statement-breakpoint
CREATE INDEX "posts_agent_id_idx" ON "posts" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "posts_deleted_at_idx" ON "posts" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "posts_status_idx" ON "posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "posts_review_status_idx" ON "posts" USING btree ("review_status");