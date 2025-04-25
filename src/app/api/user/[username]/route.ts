import { headers } from "next/headers"
import { eq, and, isNotNull } from 'drizzle-orm';

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { NextResponse } from "next/server";
import { follow } from "@/db/schema/follow";
import { alias } from "drizzle-orm/pg-core";
import { User } from "@/types/User";

import { apiCheckAuth } from "@/utils/auth";


export async function GET(request: Request, { params }: { params: { username: string } }) {
    const isLogged = await apiCheckAuth()
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }

    const userID: number = Number(isLogged.id)
    const username = params.username

    const isFollowing = alias(follow, "isFollowing")
    const isFollower = alias(follow, "isFollower")
    const users: User[] = await db.select({
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        image: user.image,
        description: user.description,
        created_at: user.created_at,
        is_follower: isNotNull(isFollower),
        is_following: isNotNull(isFollowing)
    }).from(user)
        .leftJoin(isFollowing, and(eq(isFollowing.userID, userID), eq(isFollowing.followingID, user.id)))
        .leftJoin(isFollower, and(eq(isFollower.userID, user.id), eq(isFollower.followingID, userID)))
        .where(eq(user.username, username))

    if (users[0]) {
        return NextResponse.json(users[0], { status: 200 });
    }

    return NextResponse.json({ 'error': 'User doesn\'t exist' }, { status: 404 });
}
