'use server'

import { cookies } from "next/headers"
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db/db";
import { user } from "@/db/schema/user";
import { UserJWTPayload } from "@/types/User";
import { authAction } from "@/utils/auth";


const schema = z.object({
    display_name: z.string({ invalid_type_error: 'Invalid Display Name' }).max(48).min(3, { message: "Must contain at least 1 character" }),
    description: z.string({ invalid_type_error: 'Invalid Description' }).max(150)
})

async function updateAccInfo(loggedUser: UserJWTPayload, formData: FormData) {
    const validatedFields = schema.safeParse({
        display_name: formData.get('display_name'),
        description: formData.get('description'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        await db.update(user).set({
            display_name: validatedFields.data.display_name,
            description: validatedFields.data.description
        }).where(eq(user.id, Number(loggedUser.id)))
    } catch (e) {
        return { errors: "An error occurred on the server" }
    }

    return { success: "Account updated" }
}

export async function updateAcc(prevState: any, formData: FormData) {
    return authAction(cookies().get('accessToken'), updateAccInfo, formData)
}
