ALTER TABLE "offerings" RENAME COLUMN "order" TO "sort_order";--> statement-breakpoint
ALTER TABLE "packages" DROP CONSTRAINT "packages_id_unique" CASCADE;--> statement-breakpoint
DROP INDEX "integrations_entity_id_idx";--> statement-breakpoint
DROP INDEX "sessions_session_id_idx";--> statement-breakpoint
DROP INDEX "users_clerk_id_idx";--> statement-breakpoint
DROP INDEX "users_stripe_id_idx";