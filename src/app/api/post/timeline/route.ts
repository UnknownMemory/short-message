import { desc, eq, or, and, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { follow } from "@/db/schema/follow"
import { user } from "@/db/schema/user";



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
        "image": user.image
    })
        .from(post)
        .innerJoin(follow, eq(follow.userID, userID))
        .leftJoin(user, eq(post.authorID, user.id))
        .where(
            and(
                or(eq(post.authorID, userID), eq(post.authorID, follow.followingID)),
                request.nextUrl.searchParams.has("cursor") ? lt(post.created_at, <string>request.nextUrl.searchParams.get("cursor")) : undefined
            ))
        .orderBy(desc(post.created_at))
        .limit(20)


    if (posts.length > 0) {
        return NextResponse.json({ posts, cursor: posts[posts.length - 1].created_at }, { status: 200 });
    }
}
