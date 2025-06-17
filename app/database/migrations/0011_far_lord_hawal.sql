ALTER TABLE "packages_features" RENAME COLUMN "order" TO "sort_order";--> statement-breakpoint
CREATE INDEX "packages_features_sort_order_idx" ON "packages_features" USING btree ("sort_order");