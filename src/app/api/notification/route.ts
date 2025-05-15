import { eq, sql } from 'drizzle-orm';

import { db } from "@/db/db"
import { NextResponse } from "next/server";

import { apiCheckAuth } from "@/utils/auth";
import { notification_last_read } from '@/db/schema/notification_last_read';

export async function GET(request: Request) {
    const isLogged = await apiCheckAuth()
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }
    const userID: number = Number(isLogged.id)

    const notifications = await db.execute(sql`
        WITH latest_notif AS (
            SELECT n.*, DATE(n.created_at) as notif_date,
            ROW_NUMBER() OVER(PARTITION BY DATE(n.created_at), n.post_id ORDER BY n.created_at DESC) AS rnum,
            COUNT(*) OVER(PARTITION BY DATE(n.created_at), n.post_id) AS total
            FROM notification n
            WHERE n.notified_id = ${userID}
        )

        SELECT json_build_object('postId', post.id, 'text', post.text) as post,
               json_build_object('userId', u.id, 'username', u.name) as latestNotifier,
               ln.notified_id AS notifiedId,
               ln.type,
               ln.created_at, 
               ln.total
        FROM latest_notif ln
        INNER JOIN post ON ln.post_id = post.id
        LEFT JOIN public.user u ON u.id = ln.notifier_id 
        WHERE ln.rnum = 1
        ORDER BY ln.notif_date DESC, ln.post_id
    `)

    await db.update(notification_last_read).set({ last_read: new Date() }).where(eq(notification_last_read.userId, userID))


    return NextResponse.json(notifications, { status: 200 });
}
