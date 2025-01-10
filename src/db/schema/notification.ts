import { boolean, pgTable, serial, integer, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./user";


export const typeEnum = pgEnum("type", ["like", "follow"]);

export const notification = pgTable('notification', {
    id: serial('id').primaryKey(),
    type: typeEnum("type").notNull(),
    notifierId: integer("notifier_id").references(() => user.id, { onDelete: 'cascade' }),
    notifiedId: integer("notified_id").references(() => user.id, { onDelete: 'cascade' }),
    post: varchar('display_name', { length: 48 }),
    read: boolean('read').default(false).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
