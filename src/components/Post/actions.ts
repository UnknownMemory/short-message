'use server'

import { z } from "zod"
import { cookies } from "next/headers"
import { eq, and } from "drizzle-orm";

import { db } from "@/db/db"
import { like } from "@/db/schema/like"
import { notification } from "@/db/schema/notification";
import { post } from "@/db/schema/post";
import { authAction } from "@/utils/auth"

import { Post } from "@/types/Post";
import { UserJWTPayload } from "@/types/User";
import { RowList } from "postgres";

const schema = z.object({
    postId: z.number()
})

interface Error {
    errors: string | string[] | undefined,
}


async function action(loggedUser: UserJWTPayload, postId: Post["id"]): Promise<{ notifiedId: number | null; }[] | false> {
    const validatedFields = schema.safeParse({
        postId: postId
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors.postId,
        }
    }

    const deletedLike = await db.delete(like).where(and(
        eq(like.userID, Number(loggedUser.id)),
        eq(like.postID, validatedFields.data.postId)
    )).returning({ deletedId: like.userID })

    if (deletedLike.length == 0) {
        try {
            await db.insert(like).values({
                postID: validatedFields.data.postId,
                userID: Number(loggedUser.id),
                created_at: new Date()
            })
        } catch (error) {
            console.error(error)
            return false
        }

        const result = await db.select({ authorID: post.authorID }).from(post).where(eq(post.id, Number(postId)))
        if (result.length > 0 && result[0].authorID != Number(loggedUser.id))
            return await db.insert(notification).values({
                type: "like",
                notifierId: Number(loggedUser.id),
                notifiedId: result[0].authorID,
                postId: validatedFields.data.postId,
                created_at: new Date()
            }).returning({ "notifiedId": notification.notifiedId })

    }
    return false
}

export async function likeAction(postId: Post["id"]): Promise<RowList<never[]> | false> {
    return authAction(cookies().get('accessToken'), action, postId)
}
