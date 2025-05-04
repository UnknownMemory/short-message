import { desc, eq, and, lt, aliasedTable, countDistinct } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { user } from "@/db/schema/user";
import { like } from "@/db/schema/like";

import { apiCheckAuth } from "@/utils/auth";



export async function GET(request: NextRequest, { params }: { params: { profileId: number } }) {
    const isLogged = await apiCheckAuth()
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }
    const userID: number = Number(isLogged.id)

    const likes = aliasedTable(like, "likes")
    const posts = await db.select({
        "id": post.id,
        "text": post.text,
        "authorID": post.authorID,
        "created_at": post.created_at,
        "display_name": user.display_name,
        "username": user.username,
        "image": user.image,
        "isLiked": eq(like.userID, userID),
        "likes": countDistinct(likes)
    })
        .from(post)
        .innerJoin(user, eq(post.authorID, user.id))
        .leftJoin(like, and(eq(like.userID, userID), eq(like.postID, post.id)))
        .leftJoin(likes, eq(post.id, likes.postID))
        .where(
            and(
                eq(post.authorID, params.profileId),
                request.nextUrl.searchParams.has("cursor") ? lt(post.created_at, new Date(<string>request.nextUrl.searchParams.get("cursor"))) : undefined
            ))
        .groupBy(post.id, user.id, like.userID)
        .orderBy(desc(post.created_at))
        .limit(20)


    if (posts.length > 0) {
        return NextResponse.json({ posts, cursor: posts[posts.length - 1].created_at }, { status: 200 });
    }
    return NextResponse.json({ 'error': 'No posts found' }, { status: 404 });
}
