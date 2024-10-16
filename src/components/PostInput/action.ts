'use server'
import { z } from "zod"

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { create } from "zustand"


const schema = z.object({
    text: z.string().max(150),
    userID: z.number()
})


export default async function savePost(userID: User['id'], createdAt: Date, text: string) {
    const validatedFields = schema.safeParse({
        text: text,
        userID: userID
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const newPost = await db.insert(post).values({
        text: validatedFields.data.text,
        authorID: validatedFields.data.userID,
        created_at: createdAt,
    }).returning()

    return newPost
}
