import { NextRequest, NextResponse } from "next/server";
import { desc, eq, sql, and, gt } from "drizzle-orm";

import { db } from "@/db/db";
import { notification_last_read } from "@/db/schema/notification_last_read";
import { notification } from "@/db/schema/notification";
import { apiCheckAuth } from "@/utils/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let clients = new Map();

export async function GET(request: NextRequest) {
    const isLogged = await apiCheckAuth()
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }

    const userId: number = Number(isLogged.id)

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();

    clients.set(userId, writer)
    request.signal.addEventListener('abort', (e) => {
        clients.delete(userId)
    })

    lastRead(userId)
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
            .where(and(eq(notification.notifiedId, userId), gt(notification.created_at, lastTimeline[0].last_read)))
            .orderBy(desc(sql<Date>`DATE(${notification.created_at})`))

        await writer.write(encoder.encode(`data: {"newNotifications": ${notifications.length}}\n\n`))
    }
}



export async function POST(request: NextRequest) {
    const isLogged = await apiCheckAuth()
    if (!isLogged) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }

    const data = await request.json();
    if (clients.has(data.notifiedId)) {
        await lastRead(data.notifiedId)
    }

    return NextResponse.json({ 'status': true }, { status: 200 });
}
