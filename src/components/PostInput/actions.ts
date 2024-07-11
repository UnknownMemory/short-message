'use server'
import { z } from "zod"

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { checkJWT } from "@/utils/auth"
import { cookies } from "next/headers"


const schema = z.object({
    text: z.string().max(150),
})


export default async function savePost(createdAt: Date, text: string) {

    const accessToken = cookies().get('accessToken')
    if (accessToken) {
        const isLogged = await checkJWT(accessToken.value)
        if (isLogged) {
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
                authorID: Number(isLogged.id),
                created_at: createdAt,
            }).returning()

            return newPost
        }
    }

}
