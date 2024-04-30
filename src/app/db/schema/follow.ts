import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";


export const follow = pgTable('follow', {
    id: serial('id').primaryKey(),
    user1ID: integer("user1_id").references(() => user.id),
    user2ID: integer("user2_id").references(() => user.id),
    created_at: date('created_at').notNull()
})
