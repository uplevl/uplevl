DROP TABLE "post_meta" CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "image_url" varchar(255) NOT NULL;