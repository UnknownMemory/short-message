'use server'

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

import { z } from "zod"
import { hash } from "bcryptjs"

import { db } from "@/db/db"
import { user } from "@/db/schema/user"

import { notification_last_read } from "@/db/schema/notification_last_read"
import { RateLimiter } from "@/utils/rate_limiter"

type SignUpState = {
    errors?: {
        request?: string;
        email?: string[];
        username?: string[];
        password?: string[];
    } | null;
};

const schema = z.object({
    email: z.string({ invalid_type_error: 'Invalid Email' }).email().max(254),
    username: z.string({ invalid_type_error: 'Invalid Username' }).max(48).min(1, { message: "Must contain at least 1 character" }),
    password: z.string().min(8, { message: "Must be 8 or more characters long" })
})

const rateLimiter = new RateLimiter(10, 60000)

export default async function signUp(prevState: any, formData: FormData): Promise<SignUpState | undefined> {
    const ip = headers().get("x-forwarded-for")
    const isAllowed = await rateLimiter.allow(`${ip}:/signup`)

    if (!isAllowed) {
        return {
            "errors": { "request": "Too many requests. Please try again later." }
        }
    }

    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const hashedPassword = await hash(validatedFields.data.password, 12)

    const newUser = await db.insert(user).values({
        email: validatedFields.data.email,
        username: validatedFields.data.username,
        display_name: validatedFields.data.username,
        password: hashedPassword,
    }).returning({ id: user.id })

    await db.insert(notification_last_read).values({
        userId: newUser[0].id,
        last_read: new Date()
    })

    revalidatePath('/signup')
}
