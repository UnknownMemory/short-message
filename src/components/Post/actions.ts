'use server'

import { z } from "zod"
import Redis from 'ioredis'
import { cookies } from "next/headers"
import { eq, and } from "drizzle-orm";

import { db } from "@/db/db"
import { like } from "@/db/schema/like"
import { notification } from "@/db/schema/notification";
import { post } from "@/db/schema/post";
import { authAction } from "@/utils/auth"

import { Post } from "@/types/Post";
import { UserJWTPayload } from "@/types/User";


const schema = z.object({
    postId: z.number()
})

interface Error {
    errors: string | string[] | undefined,
}

const redisServer = new Redis(process.env.REDIS_URL!)
async function addLike(loggedUser: UserJWTPayload, postId: Post["id"]): Promise<number | Error | false> {
    const validatedFields = schema.safeParse({
        postId: postId
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors.postId,
        }
    }

    try {
        await db.insert(like).values({
            postID: validatedFields.data.postId,
            userID: Number(loggedUser.id),
            created_at: new Date()
        })
    } catch (e) {
        return { errors: "An error occurred on the server" }
    }

    const result = await db.select({ authorID: post.authorID }).from(post).where(eq(post.id, Number(postId)))
    if (result.length > 0 && result[0].authorID != Number(loggedUser.id)) {
        const newLike = await db.insert(notification).values({
            type: "like",
            notifierId: Number(loggedUser.id),
            notifiedId: result[0].authorID,
            postId: validatedFields.data.postId,
            created_at: new Date()
        }).returning({ "notifiedId": notification.notifiedId })

        if (newLike[0].notifiedId != null) {
            await redisServer.publish(`user:${newLike[0].notifiedId}`, JSON.stringify({'userId': newLike[0].notifiedId}))
            return newLike[0].notifiedId
        }
    }

    return false
}


async function removeLike(loggedUser: UserJWTPayload, postId: Post["id"]): Promise<true | Error> {
    const validatedFields = schema.safeParse({
        postId: postId
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors.postId,
        }
    }

    try {
        await db.delete(like).where(and(
            eq(like.userID, Number(loggedUser.id)),
            eq(like.postID, validatedFields.data.postId)
        )).returning({ deletedId: like.userID })
    } catch (e) {
        return { errors: "An error occurred on the server" }
    }

    const postDetail = await db.select({ authorID: post.authorID }).from(post).where(eq(post.id, Number(postId)))
    if (postDetail[0].authorID != Number(loggedUser.id)) {
        try {
            await db.delete(notification).where(and(
                eq(notification.postId, Number(postId)),
                eq(notification.type, "like")
            ))
        } catch (e) {
            return { errors: "An error occurred on the server" }
        }
    }

    return true
}

export async function removeLikeAction(postId: Post["id"]): Promise<true | Error> {
    return authAction(cookies().get('accessToken'), removeLike, postId)
}

export async function addLikeAction(postId: Post["id"]): Promise<number | Error | false> {
    return authAction(cookies().get('accessToken'), addLike, postId)
}
