ALTER TABLE "posts" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "status" SET DEFAULT 'draft'::text;--> statement-breakpoint
DROP TYPE "public"."post_status";--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'published');--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "status" SET DEFAULT 'draft'::"public"."post_status";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "status" SET DATA TYPE "public"."post_status" USING "status"::"public"."post_status";