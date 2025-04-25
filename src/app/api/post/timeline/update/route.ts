import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq, or, and, gt, count } from "drizzle-orm";

import { db } from "@/db/db";
import { post } from "@/db/schema/post";
import { user } from "@/db/schema/user";
import { follow } from "@/db/schema/follow";
import { timeline } from "@/db/schema/timeline";

import { apiCheckAuth } from "@/utils/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const lastSeen = async (userID: number) => {
    const lastTimeline = await db.select().from(timeline).where(eq(timeline.userID, userID))
    if (lastTimeline.length > 0) {
        return lastTimeline[0].lastSeen
    }
}

const newPosts = async (userID: number, cursor: Date) => {
    const posts = await db.select({ count: count() })
        .from(post)
        .leftJoin(follow, eq(follow.userID, userID))
        .leftJoin(user, eq(post.authorID, user.id))
        .where(
            and(
                or(eq(post.authorID, userID), eq(post.authorID, follow.followingID)),
                gt(post.created_at, cursor)
            ))
        .limit(20)

    return posts
}

export async function GET(request: NextRequest) {
    const isLogged = await apiCheckAuth()
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }
    const userID: number = Number(isLogged.id)

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();


    const getNewPosts = setInterval(async () => {
        const cursor = await lastSeen(userID)
        if (cursor) {
            const posts = await newPosts(userID, cursor)
            if (posts[0].count > 0) {
                console.log(posts[0].count)
            }
        }


    }, 60000)


    request.signal.addEventListener('abort', (e) => {
        clearInterval(getNewPosts)
    })

    return new Response(responseStream.readable, { status: 200, headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', 'Connection': 'keep-alive' } })
}
