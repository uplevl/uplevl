ALTER TABLE "packages" RENAME COLUMN "order" TO "sort_order";--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_stripe_price_id_unique" UNIQUE("stripe_price_id");