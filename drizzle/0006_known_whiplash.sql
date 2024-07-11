ALTER TABLE "like" ADD CONSTRAINT "like_user_id_post_id_pk" PRIMARY KEY("user_id","post_id");--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "like_count" integer;--> statement-breakpoint
ALTER TABLE "like" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "like" ADD CONSTRAINT "like_user_id_post_id_unique" UNIQUE("user_id","post_id");
