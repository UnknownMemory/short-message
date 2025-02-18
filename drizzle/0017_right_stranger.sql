CREATE TABLE IF NOT EXISTS "notification_last_read" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"last_read" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification_last_read" ADD CONSTRAINT "notification_last_read_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "notification" DROP COLUMN IF EXISTS "read";