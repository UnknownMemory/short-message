import { date, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { user } from "./user";
import { post } from "./post";


export const like = pgTable('like', {
    id: serial('id').primaryKey(),
    postID: integer("post_id").references(() => post.id),
    userID: integer("user_id").references(() => user.id),
    created_at: date('created_at').notNull()
})
