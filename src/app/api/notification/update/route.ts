import Redis from 'ioredis'
import { NextRequest, NextResponse } from "next/server";
import { desc, eq, sql, and, gt } from "drizzle-orm";

import { db } from "@/db/db";
import { notification_last_read } from "@/db/schema/notification_last_read";
import { notification } from "@/db/schema/notification";
import { apiCheckAuth } from "@/utils/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


const redisServer = new Redis(process.env.REDIS_URL!)

export async function GET(request: NextRequest) {
    const user = await apiCheckAuth()
    if (!user) {
        return NextResponse.json({ 'error': 'You must be authenticated to perform this action.' }, { status: 401 });
    }

    const userKey = `user:${user.id}`

    const encoder = new TextEncoder();
    let readableStream = new ReadableStream({
        start(controller){
            redisServer.subscribe(userKey, (err) => {
                return NextResponse.json({ 'error': 'An error occurred.' }, { status: 401 });
            })

            redisServer.on('message', async (channel, message) => {
                if(channel == userKey){
                    const data = JSON.parse(message);
                    const newNotifications = await lastRead(data.userId)
                    if(newNotifications != false){
                        controller.enqueue(encoder.encode(`data: {"newNotifications": ${newNotifications}}\n\n`))
                    }
                }
            })

            request.signal.addEventListener('abort', (e) => {
                redisServer.unsubscribe(userKey)
                controller.close()
            })
        }
    });

    return new Response(readableStream, { status: 200, headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', 'Connection': 'keep-alive' } })
}

const lastRead = async (userId: number) => {
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

        return notifications.length
    }

    return false
}
