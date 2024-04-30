ALTER TABLE "folow" RENAME TO "follow";--> statement-breakpoint
ALTER TABLE "follow" DROP CONSTRAINT "folow_user1_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "follow" DROP CONSTRAINT "folow_user2_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "follow_user1_id_user_id_fk" FOREIGN KEY ("user1_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "follow_user2_id_user_id_fk" FOREIGN KEY ("user2_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
