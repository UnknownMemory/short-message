import { boolean, pgTable, serial, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./user";
import { post } from "./post";


export const typeEnum = pgEnum("type", ["like", "follow"]);

export const notification = pgTable('notification', {
    id: serial('id').primaryKey(),
    type: typeEnum("type").notNull(),
    notifierId: integer("notifier_id").references(() => user.id, { onDelete: 'cascade' }),
    notifiedId: integer("notified_id").references(() => user.id, { onDelete: 'cascade' }),
    postId: integer("post_id").references(() => post.id, { onDelete: 'cascade' }),
    read: boolean('read').default(false).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
