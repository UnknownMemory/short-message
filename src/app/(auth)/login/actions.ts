'use server'
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod"
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs'

import { db } from "@/db/db"
import { user } from "@/db/schema/user"

import { generateTokens } from "@/utils/auth";
import { getFutureDate } from "@/utils/utils";
import { RateLimiter } from "@/utils/rate_limiter";

import { User } from "@/types/User";

type LoginState = {
    errors?: {
        request?: string;
        email?: string[];
        password?: string[];
    } | null;
};

const schema = z.object({
    email: z.string({ invalid_type_error: 'Invalid Email' }).email().max(254),
    password: z.string()
})

const rateLimiter = new RateLimiter(10, 60000)

export default async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const ip = (await headers()).get("x-forwarded-for")
    const isAllowed = await rateLimiter.allow(`${ip}:/login`)

    if (!isAllowed) {
        return {
            "errors": { "request": "Too many requests. Please try again later." }
        }
    }

    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const users: User[] = await db.select().from(user).where(eq(user.email, validatedFields.data.email))

    if (users[0] && users[0].password) {
        const [accessToken, refreshToken] = await generateTokens(users[0].id.toString(), users[0].username, { 'expireAccess': '8h', 'expireRefresh': '30d' })
        const expireDate: number = getFutureDate(30)

        const passwordsMatch = await bcrypt.compare(validatedFields.data.password, users[0].password);
        if (passwordsMatch) {
            const cookiesStore = await cookies();

            cookiesStore.set('accessToken', accessToken, { sameSite: 'strict', expires: getFutureDate(8) })
            cookiesStore.set('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                domain: process.env.DOMAIN,
                path: '/api/auth/refreshtoken',
                expires: expireDate
            })

            redirect('/')
        }
    }

    return {
        errors: { "request": "Invalid email or password." },
    }
}
