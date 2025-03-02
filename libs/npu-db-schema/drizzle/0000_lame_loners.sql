CREATE TABLE "npu_creations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "npu_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"npu_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"is_main" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "npu_to_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"npu_id" uuid NOT NULL,
	"product_id" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" varchar(10) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"npu_id" uuid NOT NULL,
	"user_id" varchar NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"comment" text,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"external_id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "npu_creations" ADD CONSTRAINT "npu_creations_user_id_users_external_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("external_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "npu_images" ADD CONSTRAINT "npu_images_npu_id_npu_creations_id_fk" FOREIGN KEY ("npu_id") REFERENCES "public"."npu_creations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "npu_to_products" ADD CONSTRAINT "npu_to_products_npu_id_npu_creations_id_fk" FOREIGN KEY ("npu_id") REFERENCES "public"."npu_creations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "npu_to_products" ADD CONSTRAINT "npu_to_products_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_npu_id_npu_creations_id_fk" FOREIGN KEY ("npu_id") REFERENCES "public"."npu_creations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_users_external_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("external_id") ON DELETE no action ON UPDATE no action;