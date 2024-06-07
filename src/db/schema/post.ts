import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";


export const post = pgTable('post', {
    id: serial('id').primaryKey(),
    text: varchar('text', { length: 150 }).notNull(),
    authorID: integer("author_id").references(() => user.id),
    created_at: date('created_at').notNull()
})