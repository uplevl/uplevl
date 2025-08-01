CREATE TABLE "posts_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_social_media_id" integer NOT NULL,
	"integration_id" integer NOT NULL,
	"entity_id" varchar(128) NOT NULL,
	"customer_comment_id" varchar(128) NOT NULL,
	"customer_comment" text NOT NULL,
	"customer_name" varchar(128) NOT NULL,
	"ai_response" text,
	"timestamp" timestamp NOT NULL,
	"is_booking_interest" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_social_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" uuid NOT NULL,
	"integration_id" integer NOT NULL,
	"entity_id" varchar(128) NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "image_url" TO "images";--> statement-breakpoint
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_post_social_media_id_posts_social_media_id_fk" FOREIGN KEY ("post_social_media_id") REFERENCES "public"."posts_social_media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_integration_id_integrations_id_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_social_media" ADD CONSTRAINT "posts_social_media_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_social_media" ADD CONSTRAINT "posts_social_media_integration_id_integrations_id_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;