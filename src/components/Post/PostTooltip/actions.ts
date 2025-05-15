'use server'
import { cookies } from "next/headers";
import { z } from "zod";

import { db } from "@/db/db";
import { post } from "@/db/schema/post";

import { Post } from "@/types/Post";
import { UserJWTPayload } from "@/types/User";
import { and, eq } from "drizzle-orm";
import { authAction } from "@/utils/auth";



const schema = z.object({
    postId: z.number()
})

interface Error {
    errors: string | string[] | undefined
}

interface DeletePost {
    deletedId: number
}

async function deletePost(loggedUser: UserJWTPayload, postId: Post["id"]): Promise<Error | DeletePost[]> {
    const validatedFields = schema.safeParse({
        postId: postId
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors.postId,
        }
    }

    try {
        return await db.delete(post).where(and(
            eq(post.authorID, Number(loggedUser.id)),
            eq(post.id, validatedFields.data.postId)
        )).returning({ deletedId: post.id })
    } catch (e) {
        return { errors: "An error occurred on the server" }
    }
}


export async function deletePostAction(postId: Post["id"]): Promise<Error | DeletePost[]> {
    return authAction(cookies().get('accessToken'), deletePost, postId)
}
