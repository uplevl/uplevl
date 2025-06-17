ALTER TABLE "agents" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "package_id" DROP NOT NULL;