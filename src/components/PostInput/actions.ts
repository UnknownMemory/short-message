'use server'
import { z } from "zod"

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { authAction, checkJWT } from "@/utils/auth"
import { cookies } from "next/headers"
import { UserJWTPayload } from "@/types/User"


const schema = z.object({
    text: z.string().max(150),
})


async function action(loggedUser: UserJWTPayload, createdAt: Date, text: string) {
    const validatedFields = schema.safeParse({
        text: text,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const newPost = await db.insert(post).values({
        text: validatedFields.data.text,
        authorID: Number(loggedUser.id),
        created_at: createdAt,
    }).returning()

    return newPost
}

export default async function savePost(createdAt: Date, text: string) {
    return authAction(cookies().get('accessToken'), action, createdAt, text)
}
