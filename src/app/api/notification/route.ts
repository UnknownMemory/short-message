import { headers } from "next/headers"
import { eq, sql, count, desc } from 'drizzle-orm';

import { db } from "@/db/db"
import { notification } from "@/db/schema/notification"
import { user } from "@/db/schema/user"
import { NextResponse } from "next/server";
import { post } from "@/db/schema/post";

export async function GET(request: Request) {
    const headersList = headers()
    const userID: number = Number(<string>headersList.get('userID'))

    const notifications = await db.select({
        "post": { "postId": post.id, "text": post.text },
        "notifiers": sql`STRING_AGG(${notification.notifierId}::TEXT, ', ' ORDER BY ${notification.created_at} DESC)`,
        "notifiedId": notification.notifiedId,
        "type": notification.type,
        "created_at": sql<Date>`DATE(${notification.created_at})`.as("notification_date"),
        "total": count()
    })
        .from(notification)
        .innerJoin(post, eq(notification.postId, post.id))
        .where(eq(notification.notifiedId, userID))
        .groupBy(sql<Date>`DATE(${notification.created_at})`, notification.type, post.id, notification.notifiedId)
        .orderBy(desc(sql<Date>`DATE(${notification.created_at})`))
        .limit(10)

    if (notifications.length > 0) {
        return NextResponse.json(notifications, { status: 200 });
    }
}
