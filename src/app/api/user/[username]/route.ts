import { eq } from 'drizzle-orm';

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { username: string } }) {
    const username = params.username
    const users: User[] = await db.select({
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        image: user.image,
        description: user.description,
        created_at: user.created_at
    }).from(user).where(eq(user.username, username))

    if (users[0]) {
        return NextResponse.json(users[0], { status: 200 });
    }

    return NextResponse.json({ 'error': 'User doesn\'t exist' }, { status: 404 });
}
