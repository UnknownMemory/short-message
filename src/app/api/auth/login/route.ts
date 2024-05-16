import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';


import { db } from "@/app/db/db";
import { user } from "@/app/db/schema/user"
import { generateTokens } from '@/utils/auth';
import { getFutureDate } from '@/utils/utils';

export async function POST(request: Request) {
    const res = await request.formData();
    const email = res.get('email') as string
    const password = res.get('password') as string

    const users: User[] = await db.select().from(user).where(eq(user.email, email))

    if (users[0] && users[0].password) {
        const [accessToken, refreshToken] = await generateTokens(users[0].id, { 'expireAccess': '8h', 'expireRefresh': '30d' })
        const expireDate: string = getFutureDate(30)

        const passwordsMatch = await bcrypt.compare(password, users[0].password);
        if (passwordsMatch) {
            return NextResponse.json(
                { 'accessToken': accessToken },
                { status: 200, headers: { 'Set-Cookie': `refreshToken=${refreshToken};Domain=${process.env.HOST};Path=/api/auth/refreshtoken;Expires=${expireDate};HttpOnly;SameSite=Strict` } }
            );
        }
    }

    return NextResponse.json({ 'error': 'Authentication error' }, { status: 401 });
}
