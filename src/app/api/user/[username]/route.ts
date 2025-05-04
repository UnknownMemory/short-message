import { eq, and, isNotNull, count } from 'drizzle-orm';

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { NextResponse } from "next/server";
import { follow } from "@/db/schema/follow";
import { alias, PgSelect, PgTableWithColumns } from "drizzle-orm/pg-core";
import { User } from "@/types/User";

import { apiCheckAuth } from "@/utils/auth";


const withIsFollower = <T extends PgSelect>(qb: T, userID: number) => {
    const isFollowing = alias(follow, "isFollowing")
    return qb.leftJoin(isFollowing, and(eq(isFollowing.userID, userID), eq(isFollowing.followingID, user.id))).groupBy(user.id, isFollowing.userID, isFollowing.followingID)
}

export async function GET(request: Request, { params }: { params: { username: string } }) {
    const loggedUser = await apiCheckAuth()
    if (!loggedUser) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }

    const userID: number = Number(loggedUser.id)
    const username = params.username
    const isUserProfile = username != loggedUser.username

    const isFollowing = alias(follow, "isFollowing")
    const following = alias(follow, "following")
    const follower = alias(follow, "follower")

    let users: User[];
    let userQuery = db.select({
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        image: user.image,
        description: user.description,
        created_at: user.created_at,
        follower: count(follower),
        following: count(following),
        ...(isUserProfile && { is_following: isNotNull(isFollowing) })
    }).from(user)
        .leftJoin(following, eq(following.followingID, userID))
        .leftJoin(follower, eq(follower.followingID, user.id))
        .where(eq(user.username, username))
        .groupBy(user.id)
        .$dynamic()

    if (isUserProfile) {
        userQuery = withIsFollower(userQuery, userID)
    }

    users = await userQuery
    if (users[0]) {
        return NextResponse.json(users[0], { status: 200 });
    }

    return NextResponse.json({ 'error': 'User doesn\'t exist' }, { status: 404 });
}
