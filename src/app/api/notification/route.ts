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

    if (notifications.length > 0) {
        return NextResponse.json(notifications, { status: 200 });
    }

    return NextResponse.json({ 'error': 'Notifications not found' }, { status: 404 });
}
