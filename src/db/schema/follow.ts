import { pgTable, serial, integer, unique, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";


export const follow = pgTable('follow', {
    userID: integer("user_id").references(() => user.id),
    followingID: integer("following_id").references(() => user.id),
    created_at: timestamp('created_at').notNull()
}, (t) => ({
    pk: primaryKey({ columns: [t.userID, t.followingID] }),
    uni: unique().on(t.userID, t.followingID)
}))
