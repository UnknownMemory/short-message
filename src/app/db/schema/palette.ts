import { pgTable, serial, text } from "drizzle-orm/pg-core";


export const palette = pgTable('palette', {
    id: serial('id').primaryKey(),
    colors: text('colors').array()
})
