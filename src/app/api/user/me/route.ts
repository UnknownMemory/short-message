import { NextResponse } from "next/server";
import { headers } from "next/headers"
import { eq } from 'drizzle-orm';

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { User } from "@/types/User";


export async function GET(request: Request) {
    const headersList = headers()
    const userID: string = <string>headersList.get('userID')

    const users: User[] = await db.select({
        id: user.id,
        username: user.username,
        email: user.email,
        display_name: user.display_name,
        image: user.image,
        description: user.description,
        is_admin: user.is_admin,
        created_at: user.created_at
    }).from(user).where(eq(user.id, Number(userID)))

    if (users[0]) {
        return NextResponse.json(users[0], { status: 200 });
    }

    return NextResponse.json({ 'error': 'User doesn\'t exist' }, { status: 404 });
}
