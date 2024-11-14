import { timestamp, integer, pgTable, primaryKey, unique } from "drizzle-orm/pg-core";
import { user } from "./user";
import { post } from "./post";


export const like = pgTable('like', {
    postID: integer("post_id").references(() => post.id, { onDelete: 'cascade' }),
    userID: integer("user_id").references(() => user.id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').notNull()
}, (t) => ({
    pk: primaryKey({ columns: [t.userID, t.postID] }),
    uni: unique().on(t.userID, t.postID)
}))
