'use server'

import { z } from "zod"
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs'

import { db } from "@/app/db/db"
import { user } from "@/app/db/schema/user"
import { generateTokens } from "@/utils/auth";
import { getFutureDate } from "@/utils/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const schema = z.object({
    email: z.string({ invalid_type_error: 'Invalid Email' }).email().max(254),
    password: z.string()
})

export default async function login(prevState: any, formData: FormData) {

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
        const [accessToken, refreshToken] = await generateTokens(users[0].id, { 'expireAccess': '8h', 'expireRefresh': '30d' })
        const expireDate: number = getFutureDate(30)

        const passwordsMatch = await bcrypt.compare(validatedFields.data.password, users[0].password);
        if (passwordsMatch) {
            const cookiesStore = cookies();

            await cookiesStore.set('accessToken', accessToken, { sameSite: 'strict', expires: getFutureDate(8) })
            await cookiesStore.set('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', domain: process.env.DOMAIN, path: '/api/auth/refreshtoken', expires: expireDate })

            redirect('/')
        }
    }
}
