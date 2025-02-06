ALTER TABLE "notification" RENAME COLUMN "display_name" TO "post_id";--> statement-breakpoint
ALTER TABLE "notification" ALTER COLUMN "post_id" TYPE integer USING post_id::integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
