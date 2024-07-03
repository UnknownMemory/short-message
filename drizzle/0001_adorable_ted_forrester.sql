ALTER TABLE "follow" RENAME COLUMN "user1_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "follow" RENAME COLUMN "user2_id" TO "following_id";--> statement-breakpoint
ALTER TABLE "follow" DROP CONSTRAINT "follow_user1_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "follow" DROP CONSTRAINT "follow_user2_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "follow_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_user_id_fk" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "follow" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "follow" ADD CONSTRAINT "follow_user_id_following_id_unique" UNIQUE("user_id","following_id");