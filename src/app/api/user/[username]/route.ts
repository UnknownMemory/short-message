import { headers } from "next/headers"
import { eq } from 'drizzle-orm';

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { username: string } }) {
    const username = params.username
    const users: User[] = await db.select().from(user).where(eq(user.username, username))

    if (users[0]) {
        delete users[0]['password']
        delete users[0]['is_admin']
        return NextResponse.json(users[0], { status: 200 });
    }

    return NextResponse.json({ 'error': 'User doesn\'t exist' }, { status: 404 });
}
