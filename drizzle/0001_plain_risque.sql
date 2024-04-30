CREATE TABLE IF NOT EXISTS "folow" (
	"id" serial PRIMARY KEY NOT NULL,
	"user1_id" integer,
	"user2_id" integer,
	"created_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "like" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"user_id" integer,
	"created_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "palette" (
	"id" serial PRIMARY KEY NOT NULL,
	"colors" text[]
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folow" ADD CONSTRAINT "folow_user1_id_user_id_fk" FOREIGN KEY ("user1_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folow" ADD CONSTRAINT "folow_user2_id_user_id_fk" FOREIGN KEY ("user2_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "like" ADD CONSTRAINT "like_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "like" ADD CONSTRAINT "like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
