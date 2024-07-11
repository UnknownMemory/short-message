'use server'
import { is } from "drizzle-orm"
import { cookies } from "next/headers"
import { z } from "zod"


import { checkJWT } from "@/utils/auth"
import { db } from "@/db/db"
import { like } from "@/db/schema/like"

const schema = z.object({
    postId: z.number()
})

export async function likeAction(postId: Post["id"]) {
    const accessToken = cookies().get('accessToken')

    if (accessToken) {
        const isLogged = await checkJWT(accessToken.value)
        if (isLogged) {
            const validatedFields = schema.safeParse({
                postId: postId
            })

            if (!validatedFields.success) {
                return {
                    errors: validatedFields.error.flatten().fieldErrors,
                }
            }

            await db.insert(like).values({
                postID: validatedFields.data.postId,
                userID: Number(isLogged.id),
                created_at: new Date()
            })
        }
    }



}
