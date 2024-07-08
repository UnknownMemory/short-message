'use server'

import { z } from "zod"
import { db } from "@/db/db"
import { user } from "@/db/schema/user"
import { revalidatePath } from "next/cache"
import { hash } from "bcryptjs"


const schema = z.object({
    email: z.string({ invalid_type_error: 'Invalid Email' }).email().max(254),
    username: z.string({ invalid_type_error: 'Invalid Username' }).max(48).min(1, { message: "Must contain at least 1 character" }),
    password: z.string().min(8, { message: "Must be 8 or more characters long" })
})

export default async function signUp(prevState: any, formData: FormData) {
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

    await db.insert(user).values({
        email: validatedFields.data.email,
        username: validatedFields.data.username,
        display_name: validatedFields.data.username,
        avatar: '',
        password: hashedPassword,
    })

    revalidatePath('/signup')
}
