import { integer, pgTable, timestamp, serial } from "drizzle-orm/pg-core";
import { user } from "./user";


export const timeline = pgTable('timeline', {
    id: serial('id').primaryKey(),
    userID: integer("user_id").references(() => user.id, { onDelete: 'cascade' }).unique(),
    lastSeen: timestamp('last_seen').notNull()
})
