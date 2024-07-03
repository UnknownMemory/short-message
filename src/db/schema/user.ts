import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    username: varchar('name', { length: 48 }).notNull(),
    email: varchar('email', { length: 254 }).notNull().unique(),
    password: text('password').notNull(),
    display_name: varchar('display_name', { length: 48 }).notNull(),
    image: text('image'),
    description: varchar('description', { length: 150 }),
    is_admin: boolean('is_admin').default(false),
    created_at: timestamp('created_at').defaultNow().notNull()
})
