ALTER TABLE "npu_creations" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npu_creations" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npu_images" ALTER COLUMN "is_main" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npu_creations" ADD COLUMN "avg_rating" numeric(3, 2);