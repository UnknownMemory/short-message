"use server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { checkJWT } from "@/utils/auth"


export default async function deleteUserAction() {
    const accessToken = cookies().get('accessToken')
    if (accessToken) {
        const loggedUser = await checkJWT(accessToken.value);

        if (loggedUser) {
            const res = await db.delete(user).where(eq(user.id, Number(loggedUser.id))).returning();
            if (res.length > 0) {
                cookies().set('refreshToken', 'del', { httpOnly: true, sameSite: 'strict', domain: process.env.DOMAIN, path: '/api/auth/refreshtoken', maxAge: 0 })
                cookies().delete('accessToken')

                redirect('/login');
            }
        }
    }
}
