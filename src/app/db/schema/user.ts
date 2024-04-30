import { boolean, date, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: varchar('email', { length: 254 }).notNull().unique(),
    password: text('password').notNull(),
    display_name: varchar('display_name', { length: 48 }).notNull(),
    avatar: text('url').notNull(),
    description: varchar('description', { length: 150 }),
    is_admin: boolean('is_admin').default(false),
    created_at: date('created_at').notNull()
})
