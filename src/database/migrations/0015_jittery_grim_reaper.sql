ALTER TABLE "posts_comments" RENAME COLUMN "customer_comment_id" TO "comment_id";--> statement-breakpoint
ALTER TABLE "posts_comments" RENAME COLUMN "customer_name" TO "commenter_username";--> statement-breakpoint
ALTER TABLE "posts_comments" RENAME COLUMN "customer_comment" TO "comment_text";--> statement-breakpoint
ALTER TABLE "posts_comments" RENAME COLUMN "timestamp" TO "comment_timestamp";--> statement-breakpoint
ALTER TABLE "posts_comments" ADD COLUMN "commenter_id" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts_comments" ADD COLUMN "ai_response_timestamp" timestamp;