'use server'

import { z } from "zod"
import { cookies } from "next/headers"
import { eq, and } from "drizzle-orm";

import { db } from "@/db/db"
import { checkJWT } from "@/utils/auth"
import { like } from "@/db/schema/like"

const schema = z.object({
    postId: z.number()
})

interface Error {
    errors: string | string[] | undefined,
}


export async function likeAction(postId: Post["id"]): Promise<boolean | Error> {
    const accessToken = cookies().get('accessToken')

    if (accessToken) {
        const isLogged = await checkJWT(accessToken.value)
        if (isLogged) {
            const validatedFields = schema.safeParse({
                postId: postId
            })

            if (!validatedFields.success) {
                return {
                    errors: validatedFields.error.flatten().fieldErrors.postId,
                }
            }

            const deletedLike = await db.delete(like).where(and(
                eq(like.userID, Number(isLogged.id)),
                eq(like.postID, validatedFields.data.postId)
            )).returning({ deletedId: like.userID })

            if (deletedLike.length == 0) {
                await db.insert(like).values({
                    postID: validatedFields.data.postId,
                    userID: Number(isLogged.id),
                    created_at: new Date()
                })

                return true
            }

            return false

        }
    }

    return { 'errors': 'You must be authenticated to perform this action.' }

}
