import { NextResponse } from "next/server";
import { headers } from "next/headers"
import { eq, and } from 'drizzle-orm';

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { user } from "@/db/schema/user"
import { like } from "@/db/schema/like"

import { apiCheckAuth } from "@/utils/auth";


export async function GET(request: Request, { params }: { params: { postId: number } }) {
    const isLogged = await apiCheckAuth()
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }
    const userID: number = Number(isLogged.id)

    const userPost = await db.select({
        "id": post.id,
        "text": post.text,
        "authorID": post.authorID,
        "created_at": post.created_at,
        "display_name": user.display_name,
        "username": user.username,
        "image": user.image,
        "isLiked": like.userID
    })
        .from(post)
        .leftJoin(user, eq(post.authorID, user.id))
        .leftJoin(like, and(eq(like.userID, userID), eq(like.postID, post.id)))
        .where(eq(post.id, params.postId))

    if (userPost.length > 0) {
        return NextResponse.json(userPost[0], { status: 200 });
    }

    return NextResponse.json({ 'error': 'Post doesn\'t exist' }, { status: 404 });
}
