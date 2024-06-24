import { desc, eq, or } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/db/db"
import { post } from "@/db/schema/post"
import { follow } from "@/db/schema/follow"



export async function GET(request: Request, { params }: { params: { offset: string } }) {
    const headersList = headers()
    const userID: number = Number(<string>headersList.get('userID'))
    console.log(userID, headersList.get('userID'))
    const posts = await db.select({
        "id": post.id,
        "text": post.text,
        "authorID": post.authorID,
        "created_at": post.created_at
    })
        .from(post)
        .innerJoin(follow, eq(follow.userID, userID))
        .where(or(eq(post.authorID, userID), eq(post.authorID, follow.followingID)))
        .orderBy(desc(post.created_at))

    if (posts) {
        console.log(posts)
        return NextResponse.json(posts, { status: 200 });
    }
}
