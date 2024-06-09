import { headers } from "next/headers"
import { eq } from 'drizzle-orm';

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const headersList = headers()
    const userID: string = <string>headersList.get('userID')

    const users: User[] = await db.select().from(user).where(eq(user.id, Number(userID)))

    if (users[0]) {
        delete users[0]['password']
        return NextResponse.json(users[0], { status: 200 });
    }

    return NextResponse.json({ 'error': 'User doesn\'t exist' }, { status: 404 });
}
