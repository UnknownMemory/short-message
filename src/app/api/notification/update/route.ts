import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq, count, sql } from "drizzle-orm";

import { db } from "@/db/db";
import { post } from "@/db/schema/post";
import { user } from "@/db/schema/user";
import { notification_last_read } from "@/db/schema/notification_last_read";
import { notification } from "@/db/schema/notification";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let clients = new Map()

export async function GET(request: NextRequest) {
    const headersList = headers()
    const userId = Number(<string>headersList.get('userID'))

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    // const encoder = new TextEncoder();

    clients.set(userId, writer)

    request.signal.addEventListener('abort', (e) => {
        clients.delete(userId)
    })

    return new Response(responseStream.readable, { status: 200, headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', 'Connection': 'keep-alive' } })
}

const lastRead = async (userId: number) => {
    const writer = clients.get(userId)
    const encoder = new TextEncoder();

    const lastTimeline = await db.select().from(notification_last_read).where(eq(notification_last_read.userId, userId))
    if (lastTimeline.length > 0) {
        const notifications = await db.select({
            "notifiedId": notification.notifiedId,
            "type": notification.type,
            "created_at": sql<Date>`DATE(${notification.created_at})`.as("notification_date"),
        })
            .from(notification)
            .where(eq(notification.notifiedId, userId))
            .groupBy(sql<Date>`DATE(${notification.created_at})`, notification.type, notification.notifiedId)
            .orderBy(desc(sql<Date>`DATE(${notification.created_at})`))
        console.log(notifications.length)
        await writer.write(encoder.encode(`data: {"newNotifications": ${notifications.length}}\n\n`))
    }
}



export async function POST(request: NextRequest) {
    // const headersList = headers()
    // const userId = Number(<string>headersList.get('userID'))
    const data = await request.json()
    if (clients.get(data.userId)) {
        await lastRead(data.userId)
    }

    return NextResponse.json({ 'status': true }, { status: 200 });
}
