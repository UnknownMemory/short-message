import { boolean, pgTable, serial, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./user";


export const notification_last_read = pgTable('notification_last_read', {
    id: serial('id').primaryKey(),
    userId: integer("user_id").references(() => user.id, { onDelete: 'cascade' }),
    last_read: timestamp('last_read').notNull(),
})
