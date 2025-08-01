ALTER TABLE "posts_social_media" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "posts_social_media" CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "entity_id" varchar(128);--> statement-breakpoint
ALTER TABLE "posts_comments" DROP COLUMN "post_social_media_id";