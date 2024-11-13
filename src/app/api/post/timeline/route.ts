import { desc, eq, or, and, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { follow } from "@/db/schema/follow"
import { user } from "@/db/schema/user";
import { like } from "@/db/schema/like";
import { timeline } from "@/db/schema/timeline";



export async function GET(request: NextRequest) {
    const headersList = headers()
    const userID: number = Number(<string>headersList.get('userID'))

    const posts = await db.select({
        "id": post.id,
        "text": post.text,
        "authorID": post.authorID,
        "created_at": post.created_at,
        "display_name": user.display_name,
        "username": user.username,
        "image": user.image,
        "isLiked": eq(like.userID, userID),
    })
        .from(post)
        .leftJoin(follow, eq(follow.userID, userID))
        .leftJoin(user, eq(post.authorID, user.id))
        .leftJoin(like, and(eq(like.userID, userID), eq(like.postID, post.id)))
        .where(
            and(
                or(eq(post.authorID, userID), eq(post.authorID, follow.followingID)),
                request.nextUrl.searchParams.has("cursor") ? lt(post.created_at, new Date(<string>request.nextUrl.searchParams.get("cursor"))) : undefined
            ))
        .orderBy(desc(post.created_at))
        .limit(20)


    if (posts.length > 0) {
        await db.insert(timeline).values({ userID: userID, lastSeen: posts[0].created_at })
            .onConflictDoUpdate({
                target: timeline.userID,
                set: { lastSeen: posts[0].created_at }
            })

        return NextResponse.json({ posts, cursor: posts[posts.length - 1].created_at }, { status: 200 });
    }
    return NextResponse.json({ 'error': 'No posts found' }, { status: 401 });
}
