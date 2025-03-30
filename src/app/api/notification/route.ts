import { headers } from "next/headers"
import { eq, sql, count, desc, max, and } from 'drizzle-orm';

import { db } from "@/db/db"
import { notification } from "@/db/schema/notification"
import { user } from "@/db/schema/user"
import { NextResponse } from "next/server";
import { post } from "@/db/schema/post";

import { apiCheckAuth } from "@/utils/auth";

export async function GET(request: Request) {
    const isLogged = await apiCheckAuth(headers())
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 400 });
    }
    const userID: number = Number(isLogged.id)

    const notifications = await db.select({
        "post": { "postId": post.id, "text": post.text },
        "latestNotifier": { "userId": user.id, "username": user.username },
        "notifiedId": notification.notifiedId,
        "type": notification.type,
        "created_at": sql<Date>`DATE(${notification.created_at})`.as("notification_date"),
        "total": count()
    })
        .from(notification)
        .innerJoin(post, eq(notification.postId, post.id))
        .leftJoin(user, eq(user.id, sql`(
        SELECT MAX(notifier_id) 
        FROM notification 
        WHERE post_id = ${notification.postId} 
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC
        LIMIT 1
    )`))
        .where(eq(notification.notifiedId, userID))
        .groupBy(sql<Date>`DATE(${notification.created_at})`, notification.type, post.id, notification.notifiedId, user.id)
        .orderBy(desc(sql<Date>`DATE(${notification.created_at})`))
        .limit(10)

    if (notifications.length > 0) {
        return NextResponse.json(notifications, { status: 200 });
    }

    return NextResponse.json({ 'error': 'Notifications not found' }, { status: 404 });
}
