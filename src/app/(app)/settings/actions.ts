"use server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { authAction } from "@/utils/auth"
import { UserJWTPayload } from "@/types/User"


export default async function deleteUserAction() {
    return authAction(cookies().get('accessToken'), action)
}


async function action(loggedUser: UserJWTPayload) {
    const res = await db.delete(user).where(eq(user.id, Number(loggedUser.id))).returning();
    if (res.length > 0) {
        cookies().set('refreshToken', 'del', { httpOnly: true, sameSite: 'strict', domain: process.env.DOMAIN, path: '/api/auth/refreshtoken', maxAge: 0 })
        cookies().delete('accessToken')

        redirect('/login');
    }
}
