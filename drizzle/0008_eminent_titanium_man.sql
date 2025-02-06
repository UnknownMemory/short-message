CREATE TABLE IF NOT EXISTS "timeline" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"last_seen" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timeline" ADD CONSTRAINT "timeline_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
